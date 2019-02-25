import { injectable, inject } from 'inversify';
import { spawn } from 'child_process';
import TYPES from './types';
import { FileSystemService } from './filesystem-service';
import { MessageService } from './message-service';

@injectable()
export class ClipboardService {
    constructor(
        @inject(TYPES.FileSystemService) private fileSystemService: FileSystemService,
        @inject(TYPES.MessageService) private messageService: MessageService
      ){}

    getContentsAndSaveToFile(path: string, callback: (imagePath: string, imagePathFromScript: string) => void) {
        let context = this;

        if (!path) return;

        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/pc.ps1');

            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = context.fileSystemService.directoryExists(command)
            if (!powershellExisted) {
                command = "powershell"
            }

            const powershell = spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
                path
            ]);
            powershell.on('error', function (e: any) {
                if (e.code == "ENOENT") {
                    context.messageService.showError(`The powershell command is not in you PATH environment variables.Please add it and retry.`);
                } else {
                    context.messageService.showError(e);
                }
            });
            powershell.on('exit', function (code, signal) {
                // console.log('exit', code, signal);
            });
            powershell.stdout.on('data', function (data: Buffer) {
                callback(path, data.toString().trim());
            });
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/mac.applescript');

            let ascript = spawn('osascript', [scriptPath, path]);
            ascript.on('error', function (e: any) {
                context.messageService.showError(e);
            });
            ascript.on('exit', function (code, signal) {
                // console.log('exit',code,signal);
            });
            ascript.stdout.on('data', function (data: Buffer) {
                callback(path, data.toString().trim());
            });
        } else {
            // Linux 

            let scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/linux.sh');

            let ascript = spawn('sh', [scriptPath, path]);
            ascript.on('error', function (e: any) {
                context.messageService.showError(e);
            });
            ascript.on('exit', function (code, signal) {
                // console.log('exit',code,signal);
            });
            ascript.stdout.on('data', function (data: Buffer) {
                let result = data.toString().trim();
                if (result == "no xclip") {
                    context.messageService.showInformation('You need to install xclip command first.');
                    return;
                }
                callback(path, result);
            });
        }
    }
}