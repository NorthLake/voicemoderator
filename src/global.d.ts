import { Client, ClientEvents, Message } from 'discord.js';

declare global {
  namespace NodeJS {
    interface Global {
      client: Client;
      getFilesInDirectory: (dir: string) => string[];
    }
  }
}
export default global;

export type Listener<Event extends keyof ClientEvents> = { type: Event, execute: (...args: ClientEvents[Event]) => void };
export type Command = { name: string, execute: (message: Message) => void };
