// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandManager } from './commands/command-manager';
import container from './inversify.config';
import TYPES from './types';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const cmdManager = container.get<CommandManager>(TYPES.CommandManager);
	cmdManager.registerCommands(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
