import { injectable, inject } from "inversify";
import { ICommand } from "./icommand";
import { MessageHandler } from '../message-handler';
import TYPES from '../types';

@injectable()
export class HelloWorldCommand implements ICommand {

  constructor(
    @inject(TYPES.MessageHandler) private messageHandler: MessageHandler
  ) {}

  get id() { return "extension.helloWorld"; }

  execute(...args: any[]) {
    this.messageHandler.showInformation('Hello gep13 stream!');
  }
}