import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';
import { ICommand } from './commands/icommand';
import { CommandManager } from './commands/command-manager';

const container = new Container();
//container.bind<ICommand>(TYPES.Command).to(UploadToAzureCommand);
container.bind<CommandManager>(TYPES.CommandManager).to(CommandManager);

export default container;