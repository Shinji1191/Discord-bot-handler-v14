const { Client, Collection } = require("discord.js");
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
      ]
    })
  }

  init() {
    this.login(this.config.bot.token)
    handler(this)
  }
}

module.exports = ExtendedClient