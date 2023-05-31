const { Event } = require("../../Structures/Util/Classes/Event");
const { EmbedBuilder } = require("discord.js");

module.exports = new Event({
  name: "interactionCommandRun",
  event: "interactionCreate",
  async run (client, interaction) {
    if (interaction.isChatInputCommand()) {
      let command = client.slashCommands.get(interaction.commandName);

      if (!command) {
        let embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("```❌ | The command you ran does not exist.```")
          .setColor("#2B2D31");
        return message.reply({ embeds: [embed] });
      }

      if (command.config) {
        if (command.config.developerOnly && client.config.developer.id !== interaction.user.id) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | This command is only for my developer.```")
            .setColor("#2B2D31");
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
  
        if (command.config.guildOnly && client.config.developer.privateServerID !== interaction.guild.id) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | This command only a server only command.```")
            .setColor("#2B2D31");
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
  
        if (command.config.nsfw && !interaction.channel.nsfw) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | You can only run this command in a nsfw enabled channel.```")
            .setColor("#2B2D31")
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
  
        if (command.config.ownerOnly && interaction.guild.ownerId !== interaction.user.id) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | This command is only for the owner of this server.```")
            .setColor("#2B2D31")
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
  
      if (command.permissions) {
        if (command.permissions.user && !interaction.memberPermissions.has(command.permissions.user || [])) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | You do not have the permissions to use this command.```")
            .setColor("#2B2D31")
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
  
        if (command.permissions.bot && !interaction.guild.members.me.permissions.has(command.permissions.bot || [])) {
          let embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("```❌ | I do not have the permissions to run this command.```")
            .setColor("#2B2D31")
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }

      command.run({ client, interaction })
    }
  }
})