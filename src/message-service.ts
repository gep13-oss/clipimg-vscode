import * as vscode from 'vscode';
import { injectable } from 'inversify';

@injectable()
export class MessageService {
  showInformation(message: string): void {
    vscode.window.showInformationMessage(message);
  }
}