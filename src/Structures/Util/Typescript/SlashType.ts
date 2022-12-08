import { ChatInputApplicationCommandData, PermissionResolvable, ChatInputCommandInteraction, GuildMember } from "discord.js";
import ExtendedClient from "../../Client/Client";

interface ExtendedInteraction extends ChatInputCommandInteraction {
  member: GuildMember
}

interface runOptions {
  client: ExtendedClient,
  interaction: ExtendedInteraction
}

type Run = (options: runOptions) => any;

export type SlashCommandType = {
  category: string
  directory?: string
  usage?: string
  config?: {
    ownerOnly?: boolean
    developerOnly?: boolean
    guildOnly?: boolean
    nsfw?: boolean
  }
  permissions?: {
    user?: PermissionResolvable[]
    bot?: PermissionResolvable[]
  }
  run: Run
} & ChatInputApplicationCommandData