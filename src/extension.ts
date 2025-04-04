import psList, { ProcessDescriptor } from "ps-list-commonjs";
import * as vscode from "vscode";

export function filterProcessesForRegexList(
  processes: ProcessDescriptor[],
  regexList: string[]
): ProcessDescriptor[] {
  if (regexList.length <= 0) {
    return processes;
  }
  return processes.filter((p: ProcessDescriptor): boolean => {
    return regexList.some((regexString: string): boolean => {
      const regex = new RegExp(regexString);
      return regex.test(p.name);
    });
  });
}

async function getRunningProcessesMatchingRegexList(
  regexList: string[] | undefined,
  skipUserDialogIfOnlyOneOption: boolean | undefined
): Promise<string> {
  let processes = await psList();

  if (regexList && regexList.length > 0) {
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

  // No process selected
  throw new vscode.CancellationError();
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "regex-process-picker" is now active!');

  const numberOfRegexLists = 5;

  for (let ruleIndex = 1; ruleIndex <= numberOfRegexLists; ruleIndex++) {
    const disposable = vscode.commands.registerCommand(
      "regex-process-picker.pickProcessMatchingRegexList" + ruleIndex,
      async (): Promise<string> => {
        const config: vscode.WorkspaceConfiguration =
          vscode.workspace.getConfiguration("regex-process-picker");

        return getRunningProcessesMatchingRegexList(
          config.get<string[]>("regexList" + ruleIndex),
          config.get<boolean>("skipUserDialogIfOnlyOneOption")
        );
      }
    );

    context.subscriptions.push(disposable);
  }
}

export function deactivate() {}
