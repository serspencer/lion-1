
import { TextChannel } from 'discord.js';
import { Plugin } from '../../common/plugin';
import { ChannelType, IContainer, IMessage } from '../../common/types';

export class SlowModePlugin extends Plugin {
  public name: string = 'Slowmode Plugin';
  public description: string = 'add slowmode for 0 - 21600 seconds';
  public usage: string = 'slowmode <time>';
  public pluginAlias = ['slow'];
  public permission: ChannelType = ChannelType.Public;
  
  constructor(public container: IContainer) {
    super();
  }

  public async execute(message: IMessage, args?: string[]) {

    
    if (!args || args.length <= 0) {
      message.reply('Usage `!slowmode <time(0-21600)>`');
      return;
    }

    const sample = message.channel as TextChannel;
    const time = +args[0] as number;
    
    if ( time >= 0 && time <= 21600) {
      sample.setRateLimitPerUser(time);
    }
    else {
      message.reply('Please use a time between 0 and 21600');
    }
    return;
  }
}