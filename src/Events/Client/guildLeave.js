const { ChannelType, EmbedBuilder } = require("discord.js");
const { Event } = require("../../Structures/Util/Classes/Event");

module.exports = new Event({
  event: "guildDelete",
  name: "guildLeave",
  async run(client, guild) {
    let channelID = client.config.channels.guilds.leave;
    if (!channelID) return

    let channel = await client.channels.fetch(channelID);

    if (channel.type !== ChannelType.GuildText) return

    let embed = new EmbedBuilder()
      .setColor("#2B2D31")
      .setThumbnail(guild.iconURL({ forceStatic: false, size: 4096 }) || "https://hypixel.net/attachments/screenshot_2019-12-29-15-15-35-358-jpeg.1458269/")
      .setTitle("Server Leave")
      .setImage(guild.bannerURL({ forceStatic: false, size: 4096 }))
      .setDescription(`
- **Name:** \`${guild.name}\`
- **ID:** \`${guild.id}\`
- **Created At:** ${time(guild.createdAt, "R")}
      `)
    channel.send({ embeds: [embed] })
  }
})