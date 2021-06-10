import { Command } from '../../global';

export default {
  name: 'log',
  execute: async (message) => {
    console.log(message.content);
  }
} as Command;
