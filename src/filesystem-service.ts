import { workspace } from "vscode";
import * as fs from "fs";
import * as path from "path";
import { injectable, inject } from "inversify";
import { MessageService } from "./message-service";
import TYPES from "./types";

@injectable()
export class FileSystemService {
  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService
  ) {}

  combinePath(directoryPath: string, filePath: string) {
    return path.join(directoryPath, filePath);
  }

  checkForWorkspace(): string {
    if (workspace.rootPath !== undefined) {
      return workspace.rootPath;
    } else {
      this.messageService.showError("No workspace is currently open.");
      return "";
    }
  }

  async checkForExisting(path: string): Promise<boolean> {
    if (fs.existsSync(path)) {
      var message = `Overwrite the existing \'${path}\' file in this folder?`;
      var option = await this.messageService.showQuestion(message, "Overwrite");
      return option === "Overwrite";
    }

    return true;
  }

  createWriteStream(path: string) {
    return fs.createWriteStream(path);
  }

  createAppendWriteStream(path: string) {
    return fs.createWriteStream(path, {
      flags: 'a'
    });
  }

  directoryExists(path: string) {
    return fs.existsSync(path);
  }

  directoryCreate(path: string) {
    fs.mkdirSync(path);
  }
}