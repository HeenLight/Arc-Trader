const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
const Database = require("@replit/database")

module.exports = {
  name: "ban",
  description: "Ban Specified User (Staff Only)",
  permission: "ADMINISTRATOR",
  userPerms: "BAN_USERS",
  options: [
    {
      name: "target",
      description: "Target to ban",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Reason to ban user",
      type: "STRING",
      required: false,
    },
  ],
  async execute(interaction) {
    const { client } = interaction;
    const user = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");

    const db = new Database()
    const userDB = user.tag;

    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id).catch((err) => { }));

    if (!member.bannable || member.user.id === client.user.id)
      return interaction.reply("😅 | I am unable to ban this member");

    if (
      interaction.member.roles.highest.position <= member.roles.highest.position
    )
      return interaction.reply({
        content:
          "Given member have higher or equal rank as you so i can not ban them.",
        ephemeral: true,
      });



    await member.user.send({
      embeds: [new MessageEmbed()
        .setColor("RED")
        .setDescription(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``)
        .setTimestamp()
      ]
    })
      .catch((err) => { });

    db.set("userDB", "member").then(() => {
      member.ban({ reason });
      interaction.reply({
        embeds: [new MessageEmbed()
          .setColor("LUMINOUS_VIVID_PINK")
          .setDescription(`Successfully banned ${member} for ${reason}`)
          .setTimestamp()
        ]
      });
    });
  },
}