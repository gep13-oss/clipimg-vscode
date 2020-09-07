import { injectable, inject } from 'inversify';
import { spawn } from 'child_process';
import TYPES from './types';
import { FileSystemService } from './filesystem-service';

@injectable()
export class ClipboardService {
    constructor(
        @inject(TYPES.FileSystemService) private fileSystemService: FileSystemService
      ){}

    getContentsAndSaveToFile(
        path: string,
        callback: (imagePath: string, imagePathFromScript: string) => void,
        errorCallback: (imagePath: string, error: string) => void
        ) {
        let context = this;

        if (!path) { 
            return; 
        }

        let error = false;
        let reportError = (errorMessage: string) => {
            error = true;
            errorCallback(path, errorMessage);
        };

        let processStdoutCallback = (data: Buffer) => {
            let stringData = data.toString().trim();
            if (error) {
                reportError(stringData);
            }
            else if (stringData === "no image") {
                reportError('No image found.');
            }
            else if (stringData === "no xclip") {
                reportError('You need to install xclip command first.');
            }
            else {
                callback(path, stringData);
            }
        };


        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/pc.ps1');

            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = context.fileSystemService.directoryExists(command);
            if (!powershellExisted) {
                command = "powershell";
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
                if (e.code === "ENOENT") {
                    reportError(`The powershell command is not in you PATH environment variables.Please add it and retry.`);
                } else {
                    reportError(e);
                }
            });
            powershell.on('exit', function (code, signal) {
                // console.log('exit', code, signal);
            });

            if(powershell.stdout) {
                powershell.stdout.on('data', processStdoutCallback);
            } else {
                reportError('Unable to access stdout of PowerShell command');
            }
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/mac.applescript');

            let ascript = spawn('osascript', [scriptPath, path]);
            ascript.on('error', function (e: any) {
                reportError(e);
            });
            ascript.on('exit', function (code, signal) {
                // console.log('exit',code,signal);
            });

            if(ascript.stdout) {
                ascript.stdout.on('data', processStdoutCallback);
            } else {
                reportError('Unable to access stdout of ascript command');
            }
        } else {
            // Linux 

            let scriptPath = context.fileSystemService.combinePath(__dirname, '../resources/linux.sh');

            let bash = spawn('sh', [scriptPath, path]);
            bash.on('error', function (e: any) {
                reportError(e);
            });
            bash.on('exit', function (code, signal) {
                // console.log('exit',code,signal);
            });

            if(bash.stdout) {
                bash.stdout.on('data', processStdoutCallback);
            } else {
                reportError('Unable to access stdout of bash command');
            }
        }
    }
}