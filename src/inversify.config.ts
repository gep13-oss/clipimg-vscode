import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';
import { ICommand } from './commands/icommand';
import { CommandManager } from './commands/command-manager';
import { HelloWorldCommand } from './commands/helloworld-comand';
import { MessageService } from './message-service';
import { ClipboardService } from './clipboard-service';
import { FileSystemService } from './filesystem-service';

const container = new Container();
container.bind(TYPES.MessageService).to(MessageService).inSingletonScope();
container.bind(TYPES.ClipboardService).to(ClipboardService).inSingletonScope();
container.bind(TYPES.FileSystemService).to(FileSystemService).inSingletonScope();
container.bind<ICommand>(TYPES.Command).to(HelloWorldCommand);
//container.bind<ICommand>(TYPES.Command).to(UploadToAzureCommand);
container.bind<CommandManager>(TYPES.CommandManager).to(CommandManager);

export default container;