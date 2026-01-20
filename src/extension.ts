import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Acorn extension activated');

  const disposable = vscode.commands.registerCommand('acorn.hello', () => {
    vscode.window.showInformationMessage('Acorn is alive!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
