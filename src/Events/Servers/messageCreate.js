const { Event } = require("../../Structures/Util/Classes/Event");
const { EmbedBuilder } = require("discord.js");

module.exports = new Event({
  name: "messageCreate",
  async run(client, message) {
    let prefix = client.config.bot.prefix
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.toLowerCase().startsWith(prefix)
    )
      return;

    let [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)

    let command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()))

    if (!command) return

    if (command.config) {
      if (command.config.developerOnly && client.config.developer.id !== message.author.id) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | This command is only for my developer.```")
          .setColor("Red");
        return message.reply({ embeds: [embed] });
      }

      if (command.config.guildOnly && client.config.developer.privateServerID !== message.guild.id) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | This command only a server only command.```")
          .setColor("Red");
        return message.reply({ embeds: [embed] });
      }

      if (command.config.nsfw && !message.channel.nsfw) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | You can only run this command in a nsfw enabled channel.```")
          .setColor("Red")
        return message.reply({ embeds: [embed] })
      }

      if (command.config.ownerOnly && message.guild.ownerId !== message.author.id) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | This command is only for the owner of this server.```")
          .setColor("Red")
        return message.reply({ embeds: [embed] })
      }
    }

    if (command.permissions) {
      if (command.permissions.user && !message.member.permissions.has(command.permissions.user || [])) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | You do not have the permissions to use this command.```")
          .setColor("Red")
        return message.reply({ embeds: [embed] })
      }

      if (command.permissions.bot && !message.guild.members.me.permissions.has(command.permissions.bot || [])) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | I do not have the permissions to run this command.```")
          .setColor("Red")
        return message.reply({ embeds: [embed] })
      }
    }

    command.run({ args, client, message })
  },
});
