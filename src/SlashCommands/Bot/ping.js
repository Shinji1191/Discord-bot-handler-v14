const { SlashCommand } = require("../../Structures/Util/Classes/Command");
const { EmbedBuilder } = require("discord.js");

module.exports = new SlashCommand({
  name: "ping",
  description: "Ping command",
  category: "Bot",
  async run({ interaction, client }) {
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
    interaction.reply({ embeds: [embed] })
  },
});
