import * as fs from 'fs';
import { Listener } from '../global';

const badWordsFile = fs.readFileSync('badwords.json');
const badWords = JSON.parse(badWordsFile.toString()) as { word: string, action: 'ban' | 'kick' | 'warn' | 'nothing', reason: string }[];

export default {
  type: 'message',
  execute: async (message) => {
    badWords.forEach((pattern) => {
      if (message.author === global.client.user) {
        return;
      }
      if (message.content.includes(pattern.word)) {
        switch (pattern.action) {
          case 'ban':
            message.delete({ reason: pattern.reason });
            return message.channel.send(`I should ban the user with reason: ${pattern.reason}`);
            // return message.member?.ban({ reason: pattern.reason });
          case 'kick':
            message.delete({ reason: pattern.reason });
            return message.channel.send(`I should kick the user with reason: ${pattern.reason}`);
            // return message.member?.kick(pattern.reason);
          case 'warn':
            message.delete({ reason: pattern.reason });
            return message.channel.send(`I should warn the user with reason: ${pattern.reason}`);
            // return message.channel.send(`!warn <@${message.author.id} ${pattern.reason}`);
          case 'nothing':
            message.channel.send(`I should delete the message with reason: ${pattern.reason}`);
            return message.delete({ reason: pattern.reason });
          default:
            throw new Error(`unknown action ${pattern.action}`);
        }
      }
    })
  }
} as Listener<'message'>;
