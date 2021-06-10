import { Command, Listener } from '../global';

const prefix = process.env.defaultPrefix as string;

const commandFiles = global.getFilesInDirectory('commands');
const commands: Map<Command["name"], Command["execute"]> = new Map();

for (const fileName of commandFiles) {
  if (fileName.endsWith('.js')) {
    const command = (await import(fileName)).default as Command;
    commands.set(command.name, command.execute);
  }
}

export default {
  type: 'message',
  execute: async (message) => {
    if (!message.content.startsWith(prefix)) {
      return;
    }
    const command = commands.get(message.content.slice(prefix.length).split(' ', 1)[0]);
    if (command !== undefined) {
      command(message);
    }
  }
} as Listener<'message'>;
