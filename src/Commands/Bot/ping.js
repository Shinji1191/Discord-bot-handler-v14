const { PrefixCommand } = require("../../Structures/Util/Classes/Command");
const { EmbedBuilder } = require("discord.js");

module.exports = new PrefixCommand({
  name: "ping",
  description: "Ping command",
  category: "Bot",
  async run({ message, client }) {
    let emojis = {
      "good": "🟩",
      "okay": "🟨",
      "bad": "🟥",
    }

    let getLatency = client.ws.ping <= 100 ? emojis.good : client.ws.ping >= 200 ? emojis.okay : emojis.bad

    let embed = new EmbedBuilder()
      .setTitle("Pong")
      .setDescription(`
**Websocket Ping:** \`${getLatency}${client.ws.ping}ms\`
      `)
      .setColor("#2B2D31")
    message.reply({ embeds: [embed] })
  },
});
