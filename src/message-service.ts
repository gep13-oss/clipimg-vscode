import * as vscode from 'vscode';
import { injectable } from 'inversify';

@injectable()
export class MessageService {
  showInformation(message: string): void {
    vscode.window.showInformationMessage(message);
  }

  showWarning(message: string) {
    vscode.window.showWarningMessage(message);
  }
  
  async showQuestion(message: string, options: string): Promise<string | undefined> {
    return await vscode.window.showWarningMessage(message, options);
  }

  showError(message: string): void {
    vscode.window.showErrorMessage(message);
  }

  async showInput(placeHolder: string, value: string): Promise<any> {
    return await vscode.window.showInputBox({
      placeHolder: placeHolder,
      value: value
    });
  }
}