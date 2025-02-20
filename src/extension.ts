import psList, { ProcessDescriptor } from "ps-list-commonjs";
import * as vscode from "vscode";

function filterProcessesForRegexList(
  processes: ProcessDescriptor[],
  regexList: string[]
): ProcessDescriptor[] {
  return processes.filter((p: ProcessDescriptor): boolean => {
    for (let regexString of regexList) {
      const regex = new RegExp(regexString);
      if (regex.test(p.name)) {
        return true;
      }
    }
    return false;
  });
}

async function getRunningProcessesMatchingRegexList(
  regexList: string[] | undefined,
  skipUserDialogIfOnlyOneOption: boolean | undefined
): Promise<string | undefined> {
  let processes = await psList();

  if (regexList !== undefined) {
    processes = filterProcessesForRegexList(processes, regexList);
  }

  if (skipUserDialogIfOnlyOneOption && processes.length === 1) {
    return processes[0].pid.toString();
  }

  const processesShown = processes.map((p) => {
    return { label: p.name, description: p.pid.toString(), detail: p.cmd };
  });

  const selection = await vscode.window.showQuickPick(processesShown, {
    placeHolder: "Select the process to attach to",
    matchOnDetail: true,
  });

  if (selection) {
    return selection.description;
  }

  vscode.window.showWarningMessage("No process selected.");
  return undefined;
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "regex-process-picker" is now active!');

  const disposable = vscode.commands.registerCommand(
    "regex-process-picker.pickProcessMatchingRegexList",
    async (): Promise<string | undefined> => {
      const config: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration("regex-process-picker");

      return getRunningProcessesMatchingRegexList(
        config.get<string[]>("regexList"),
        config.get<boolean>("skipUserDialogIfOnlyOneOption")
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
