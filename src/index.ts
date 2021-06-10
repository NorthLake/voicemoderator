import { Client, ClientEvents} from 'discord.js';

import * as fs from 'fs';
import { Listener } from './global';

(await import('dotenv')).config();
const client = global.client = new Client();

global.getFilesInDirectory = (dir) => {
  const paths = fs.readdirSync(dir, { withFileTypes: true });

  return paths.reduce((fileNames: string[], path) => {
    if (path.isDirectory()) {
      fileNames.push(...global.getFilesInDirectory(`${dir}/${path.name}`));
    } else if (path.isFile()) {
      fileNames.push(`file:///${process.cwd().split('\\').join('/')}/${dir}/${path.name}`);
    }

    return fileNames;
  }, []);
};

process.on('SIGINT', async () => {
  if (client.user !== null) {  // May not yet be initialized
    await client.user.setStatus('invisible');
    await client.destroy();
  }
  process.exit();
});

client.once('ready', async () => {
  await client.user!.setStatus('online');
  console.log('Ready!');
});

// noinspection JSIgnoredPromiseFromCall
client.login(process.env.token);

for (const fileName of global.getFilesInDirectory('listeners')) {
  if (fileName.endsWith('.js')) {
    const listenerFile = (await import(fileName)).default as Listener<keyof ClientEvents>;
    client.on(listenerFile.type, listenerFile.execute);
  }
}
