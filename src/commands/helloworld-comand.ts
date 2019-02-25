import { injectable, inject } from "inversify";
import { ICommand } from "./icommand";
import { MessageService } from '../message-service';
import TYPES from '../types';

@injectable()
export class HelloWorldCommand implements ICommand {

  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService
  ) {}

  get id() { return "extension.helloWorld"; }

  execute(...args: any[]) {
    this.messageService.showInformation('Hello gep13 stream!');
  }
}