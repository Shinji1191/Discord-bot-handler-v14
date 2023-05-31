const { ChannelType, EmbedBuilder, time } = require("discord.js");
const { Event } = require("../../Structures/Util/Classes/Event");

module.exports = new Event({
  event: "guildMemberRemove",
  name: "memberLeave",
  async run(client, member) {
    let channelID = client.config.channels.greeter.goodbye;
    if (!channelID) return

    let channel = await client.channels.fetch(channelID);

    if (!channel || channel.type !== ChannelType.GuildText || channel.permissionsFor(member.guild.members.me).has(["SendMessages"])) return

    let embed = new EmbedBuilder()
      .setColor("#2B2D31")
      .setThumbnail(member.displayAvatarURL({ forceStatic: false, size: 4096 }))
      .setTitle("Member Join")
      .setDescription(`
- **Username:** \`${member.user.username}\`
- **Tag:** \`#${member.user.discriminator}\`
- **ID:** \`${member.user.id}\`
      `)
    channel.send({ embeds: [embed] })
  }
})