const { Client, Collection, Partials } = require("discord.js");
const handler = require("../Util/Handler/handler");
const clientConfig = require("../Util/Configurations/clientConfig")

class ExtendedClient extends Client {
  /** @type {Collection<string, import("../Util/Typescript/CommandType").CommandType>} */
  commands = new Collection();
  /** @type {Collection<string, string>} */
  aliases = new Collection();
  /** @type {Collection<string, import("../Util/Typescript/SlashType").SlashCommandType>} */
  slashCommands = new Collection();
  config = clientConfig

  constructor() {
    super({
      intents: [
        "GuildMembers",
        "GuildMessages",
        "GuildPresences",
        "GuildVoiceStates",
        "Guilds",
        "MessageContent",
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ]
    })
  }

  init() {
    this.login(this.config.bot.token)
    handler(this)
  }
}

module.exports = ExtendedClient