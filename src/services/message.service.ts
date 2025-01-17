import { IMessage } from '../common/types';
import { GuildChannel, Guild, TextChannel } from 'discord.js';
import { GuildService } from './guild.service';
import Constants from '../common/constants';

export class MessageService {
  private _botReportingChannel: TextChannel | null = null;
  private _guild: Guild;

  constructor(private _guildService: GuildService) {
    this._guild = this._guildService.get();
    this._getBotReportChannel();
  }

  getChannel(message: IMessage) {
    return message.channel as GuildChannel;
  }

  sendBotReport(message: IMessage, label: string): void {
    if (!this._botReportingChannel) {
      // We weren't able to find the bot reporting channel :(
      return;
    }
    let report = `New report on ${message.author.username}#${message.author.discriminator} from ${message.channel} for ${label}:\n`;
    if (message.content.length) {
      report += `\`\`\`${message.content.replace(/`/g, '')}\`\`\``;
    }
    this._botReportingChannel.send(report, { files: message.attachments.map((e) => e.url) });
  }

  private _getBotReportChannel(): void {
    const channels = this._guild.channels;
    for (const channel of channels) {
      const [_, channelObject] = channel;
      if (channelObject.name === Constants.Channels.Admin.BotLogs) {
        this._botReportingChannel = channelObject as TextChannel;
        return;
      }
    }
  }
}
