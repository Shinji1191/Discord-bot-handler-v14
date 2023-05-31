# Discord.js Bot Handler

---

## Installation and Usage

---

- Installation and Running

```bash
npm install
node .
```

- Usage
  - Configuring Bot Config (inside of `"src\Structures\Util\Configurations\clientConfig.js"`)

  ```js
  const clientConfig = {
    developer: {
      id: "" /** Your Personal ID */,
      privateServerID: "" /** Your private server to load the server only commands*/,
    },
    bot: {
      token: "" /** Your Bot Token */,
      databaseURL: "" /** Your MongoDB URL \*/,
      prefix: "!" /** The prefix of your bot\*/
    },
    channels: {
      greeter: {
        welcome: "", // Send welcome messages to this channel when a member joins your server
        goodbye: "" // Send goodbye messages to this channel when a member leaves your server
      },
      guilds: {
        join: "", // Send a message to this channel when your bot gets invited to a server
        leave: "" // Send a messages to this channel when your bot gets removed from a server
      },
    }
  }
  ```

  - Command Templates
    - Prefix Commands

    ```js
    const { PrefixCommand } = require("../../Structures/Util/Classes/Command");
    const { EmbedBuilder } = require("discord.js");

    module.exports = new PrefixCommand({
    name: "Command Name Here",
    description: "Command Description Here",
    category: "Command Category",
    aliases: ["Command", "Aliases",  "Here"],
    usage: "Command Usage Here",
    config: {
      ownerOnly: false, /** If the command should only be used by the owner of the server that the command was used in */
      developerOnly: false, /** If the command should only be used by the developer of the bot */
      guildOnly: false, /** If the command should be a guild only command */
      nsfw: false, /** If the command should only be ran in NSFW channels */
    }
    permissions: {
      user: [""], /** Check if the user that ran the command has the provided permissions */
      bot: [""], /** Check if the bot has the permissions to execute the command */
    },
    async run({ message, client, args }) {}, /** Running the command */
    });
    ```

    - Slash Command

    ```js
    const { SlashCommand } = require("../../Structures/Util/Classes/Command");
    const { EmbedBuilder } = require("discord.js");

    module.exports = new SlashCommand({
    name: "Command Name Here",
    description: "Command Description Here",
    category: "Command Category",
    aliases: ["Command", "Aliases",  "Here"],
    usage: "Command Usage Here",
    config: {
      ownerOnly: false, /** If the command should only be used by the owner of the server that the command was used in */
      developerOnly: false, /** If the command should only be used by the developer of the bot */
      guildOnly: false, /** If the command should be a guild only command */
      nsfw: false, /** If the command should only be ran in NSFW channels */
    }
    permissions: {
      user: [""], /** Check if the user that ran the command has the provided permissions */
      bot: [""], /** Check if the bot has the permissions to execute the command */
    },
    async run({ interaction, client, args }) {}, /** Running the command */
    });
    ```

    - Event

    ```js
    const { Event } = require("../../Structures/Util/Classes/Event");

    module.exports = new Event({
      name: "Name of the event",
      once: false, /** If the command should only run once */
      async run (client, args) {} /** Executing the command */
    })
    ```
