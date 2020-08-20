import * as vscode from 'vscode';
import { injectable, inject } from "inversify";
import { ICommand } from "./icommand";
import { MessageService } from '../message-service';
import TYPES from '../types';
import { ClipboardService } from '../clipboard-service';
import * as path from 'path';
import { Guid } from "guid-typescript";

@injectable()
export class ClipImgCommand implements ICommand {

  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService,
    @inject(TYPES.ClipboardService) private clipBoardService: ClipboardService
  ) {}

  get id() { return "extension.clipImg"; }

  async execute(...args: any[]) {
    let currentFileName = vscode.window.activeTextEditor?.document.fileName;
    if (!currentFileName) {
      this.messageService.showError("Failed to fetch current file path.");
      return;
    }

    let currentFolder =  path.dirname(currentFileName);
    let imageFileName = `${Guid.create()}.png`;
    let imageFullFileName = path.join(currentFolder, imageFileName);

    let altText = await this.messageService.showInput("Provide description for image", "");
    
    this.clipBoardService.getContentsAndSaveToFile(imageFullFileName, (imagePath, imagePathReturnByScript) => {
      let editor = vscode.window.activeTextEditor;
      if(!editor) {
        this.messageService.showError("No active editor text window found.");
        return;
      }
  
      let selection = editor.selection;
  
      editor.edit(edit => {
        let current = selection;
        let prefix = '![';
        let middle = '](';
        let suffix = ')';

        let imageFilePath = `${prefix}${altText}${middle}${imageFileName}${suffix}`;
        if(current.isEmpty) {
          edit.insert(current.start, imageFilePath);
        } else {
          edit.replace(current, imageFilePath);
        }
      });
  
    },
    (_, error)=>this.messageService.showError(error));
  }
}