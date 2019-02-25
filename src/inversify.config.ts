import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';
import { ICommand } from './commands/icommand';
import { CommandManager } from './commands/command-manager';
import { HelloWorldCommand } from './commands/helloworld-comand';
import { MessageService } from './message-service';

const container = new Container();
container.bind(TYPES.MessageService).to(MessageService).inSingletonScope();
container.bind<ICommand>(TYPES.Command).to(HelloWorldCommand);
//container.bind<ICommand>(TYPES.Command).to(UploadToAzureCommand);
container.bind<CommandManager>(TYPES.CommandManager).to(CommandManager);

export default container;