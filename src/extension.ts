import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "regex-process-picker" is now active!');

  const disposable = vscode.commands.registerCommand(
    "regex-process-picker.pickProcessMatchingRegex",
    async () => {
      const { default: psList } = await import("ps-list");
      let processes = await psList();

      const config: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration("regex-process-picker");
      const configRegexList: string[] | undefined =
        config.get<string[]>("regexList");

      if (configRegexList !== undefined) {
        processes = processes.filter((p) => {
          for (let regexString of configRegexList) {
            const regex = new RegExp(regexString);
            if (regex.test(p.name)) {
              return true;
            }
          }
          return false;
        });
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
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
