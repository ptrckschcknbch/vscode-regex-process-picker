// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "regex-process-picker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('regex-process-picker.pickProcessMatchingRegex', async () => {
		const { default: psList } = await import("ps-list");
		let processes = await psList();

		const config = vscode.workspace.getConfiguration('regex-process-picker');
		const configRegex = config.get<string>('regex'); 

		if (configRegex !== undefined) {
			const regex = new RegExp(configRegex);
			processes = processes.filter(p => regex.test(p.name));
		}
    
		const processesShown = processes.map(p => {return { label: p.name, description: p.pid.toString(), detail: p.cmd };});

        const selection = await vscode.window.showQuickPick(processesShown, {
            placeHolder: 'Select the process to attach to',
            matchOnDetail: true
        });

        if (selection) {
            vscode.window.showInformationMessage(`Selected: ${selection.label}`);
			return selection.description;
        } 

		vscode.window.showWarningMessage('No process selected.');
		return "";
        
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
