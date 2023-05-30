import { ClientEvents } from "discord.js"
import ExtendedClient from "../../Client/Client";

type Run<Key extends keyof ClientEvents> = (client: ExtendedClient, ...args: ClientEvents[Key]) => {}

export type EventType<Key extends keyof ClientEvents> = {
  name: string
  event: Key,
  run: Run<Key>,
  once?: boolean
}