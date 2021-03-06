import { Command } from '../../global';

export default {
  name: 'whoami',
  execute: async (message) => {
    const member = message.member;
    if (member !== null) {  // Sender is a webhook
      let memberName = member.nickname;
      if (memberName === undefined || memberName === null)
        memberName = member.displayName;
      return message.channel.send(`You username: ${memberName}\nYour id: ${member.id}`);
    }
  }
} as Command;
