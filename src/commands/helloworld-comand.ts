import * as vscode from 'vscode';
import { injectable, inject } from "inversify";
import { ICommand } from "./icommand";
import { MessageService } from '../message-service';
import TYPES from '../types';
import { ClipboardService } from '../clipboard-service';

@injectable()
export class HelloWorldCommand implements ICommand {

  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService,
    @inject(TYPES.ClipboardService) private clipBoardService: ClipboardService
  ) {}

  get id() { return "extension.helloWorld"; }

  async execute(...args: any[]) {
    let altText = await this.messageService.showInput("Provide description for image", "");

    this.clipBoardService.getContentsAndSaveToFile("C:\\github\\gep13\\clipimg-vscode\\tempImages\\test.png", (imagePath, imagePathReturnByScript) => {
      this.messageService.showInformation(imagePath);
      this.messageService.showInformation(imagePathReturnByScript);

      let editor = vscode.window.activeTextEditor;
      if(!editor) {
        return;
      }
  
      let selection = editor.selection;
  
      editor.edit(edit => {
        let current = selection;
        let prefix = '![';
        let middle = ']('
        let suffix = ')'

        let imageFilePath = `${prefix}${altText}${middle}${imagePathReturnByScript}${suffix}`;
        if(current.isEmpty) {
          edit.insert(current.start, imageFilePath);
        } else {
          edit.replace(current, imageFilePath);
        }
      });
  
      this.messageService.showInformation(altText);
    });
  }
}