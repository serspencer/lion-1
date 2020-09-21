import { TextChannel } from 'discord.js';
import { Plugin } from '../../common/plugin';
import { ChannelType, IContainer, IMessage } from '../../common/types';

export class SlowModePlugin extends Plugin {
  public name: string = 'Slowmode Plugin';
  public description: string = 'add slowmode via command for TA\'s';
  public usage: string = '!slowmode <time>';
  public pluginAlias = [];
  public permission: ChannelType = ChannelType.Public;
  
  constructor(public container: IContainer) {
    super();
  }

  public async execute(message: IMessage, args?: string[]) {
      if (!args || args.length <= 0) {
        message.reply('Error');
        return;
      }

      message.channel(TextChannel).setRateLimitPerUser(args[0]);
    
  }
}
