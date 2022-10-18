const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const Database = require("@replit/database")

module.exports = {
  name: "ban_list",
  description: "Ban List (Staff Only)",
  permission: "ADMINISTRATOR",
  userPerms: "BAN_USERS",

  async execute(interaction) {
    const guildBan = interaction.guild;
    const db = new Database()
    db.list().then(keys => {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("AQUA")
            .setTitle(`Ban list of ${guildBan}`)
            .setDescription(`**${keys.size} users are banned:**\n${keys}`)
            .setTimestamp(),
        ],
      });
    });

  },
};