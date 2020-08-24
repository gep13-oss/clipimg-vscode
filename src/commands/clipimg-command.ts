import * as vscode from 'vscode';
import { injectable, inject } from "inversify";
import { ICommand } from "./icommand";
import { MessageService } from '../message-service';
import TYPES from '../types';
import { ClipboardService } from '../clipboard-service';
import { BlobStorageService } from '../blobstorage-service';
import * as path from 'path';
import { Guid } from "guid-typescript";
import { promises as fs } from 'fs';

@injectable()
export class ClipImgCommand implements ICommand {

  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService,
    @inject(TYPES.ClipboardService) private clipBoardService: ClipboardService,
    @inject(TYPES.BlobStorageService) private blobStorageService: BlobStorageService
  ) {
  }

  get id() { return "extension.clipImg"; }

  async execute(...args: any[]) {
    try
    {
      let currentFileName = vscode.window.activeTextEditor?.document.fileName;

      if (!currentFileName) {
        this.messageService.showError("Failed to fetch current file path.");
        return;
      }

      let currentFolder =  path.dirname(currentFileName);
      let imageFileName = `${Guid.create()}.png`;
      let imageFullFileName = path.join(currentFolder, imageFileName);

      let altText = await this.messageService.showInput("Provide description for image", "");

      this.clipBoardService.getContentsAndSaveToFile(imageFullFileName, async (imagePath, imagePathReturnByScript)  => {
        try
        {
          let editor = vscode.window.activeTextEditor;
          if(!editor) {
            this.messageService.showError("No active editor text window found.");
            return;
          }

          let uri = await this.blobStorageService.uploadStorageBlockBlob(imageFileName, imageFullFileName);

          await fs.unlink(imageFullFileName);

          this.insertImageMarkdown(editor, altText, uri);
        }
        catch(e)
        {
          this.messageService.showError(e);
        }
      },
      (_, error)=>this.messageService.showError(error));
    }
    catch(e)
    {
      this.messageService.showError(e);
    }
  }

  private insertImageMarkdown(editor: vscode.TextEditor, altText: any, uri: string) {
    let selection = editor.selection;

    editor.edit(edit => {
      let current = selection;
      let prefix = '![';
      let middle = '](';
      let suffix = ')';

      let imageFilePath = `${prefix}${altText}${middle}${uri}${suffix}`;
      if (current.isEmpty) {
        edit.insert(current.start, imageFilePath);
      }
      else {
        edit.replace(current, imageFilePath);
      }
    });
  }
}