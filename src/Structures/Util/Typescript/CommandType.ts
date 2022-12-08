import { Message, PermissionResolvable } from "discord.js";
import ExtendedClient from "../../Client/Client";

interface runOptions {
  client: ExtendedClient,
  message: Message
  args: string[]
}

type Run = (options: runOptions) => any;

export type CommandType = {
  name: string
  description: string
  category: string
  directory?: string
  aliases?: string[]
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
}