import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';
import { ICommand } from './commands/icommand';
import { CommandManager } from './commands/command-manager';
import { ClipImgCommand } from './commands/clipimg-command';
import { MessageService } from './message-service';
import { ClipboardService } from './clipboard-service';
import { FileSystemService } from './filesystem-service';
import { BlobStorageService } from './blobstorage-service';
import { TemplateService } from './template-service';

const container = new Container();
container.bind(TYPES.MessageService).to(MessageService).inSingletonScope();
container.bind(TYPES.ClipboardService).to(ClipboardService).inSingletonScope();
container.bind(TYPES.FileSystemService).to(FileSystemService).inSingletonScope();
container.bind(TYPES.BlobStorageService).to(BlobStorageService).inSingletonScope();
container.bind(TYPES.TemplateService).to(TemplateService).inSingletonScope();
container.bind<ICommand>(TYPES.Command).to(ClipImgCommand);
container.bind<CommandManager>(TYPES.CommandManager).to(CommandManager);

export default container;