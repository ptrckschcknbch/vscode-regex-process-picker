import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "regex-process-picker" is now active!');

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

export function deactivate() {}
