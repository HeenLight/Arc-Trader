const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");
//so try make module.export part how you learned today, without choices. i will add it so you will see how add them in future
module.exports = {
  name: "setstatus",
  description: "Change the bot's status.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: `type`,
      description: `The type of the status`,
      required: true,
      type: `STRING`,
      choices: [//this choice will get fired in discord app,so no need to write them
        {
          name: "Listening",
          value: "LISTENING",
        },
        {
          name: "Playing",
          value: "PLAYING",
        },
        {
          name: "Streaming",
          value: "STREAMING",
        },
        {
          name: "Watching",
          value: "WATCHING",
        },
      ],
    },
    {
      name: `status`,//custom string for bot
      description: `The status for the bot.`,
      required: true,
      type: `STRING`,//string mean just like sentence
    },
  ],
  async execute(interaction, client) {
    const statustype = await interaction.options.getString("type");//getting string for type
    const status = await interaction.options.getString("status");//getting custom string

    try {
      client.user.setActivity(status, { type: statustype });//client is our bot so we setting activity with user class and setActivity command
    } catch (e) {//if error happened it will display sting that was eeror and called e.
      /*Try always use it and try{}catch because if something happen you bot app will not close or crash and just display error message that will help you fix it*/
      console.log(e);//displaying in console
      client.acterr = true;
      return interaction.reply(
        `There was an error setting the bot's status, ${e.toString()}`
      );//displaying in chat
    }
    if (!client.acterr) {//if no error from client, then sending image about setting status
      interaction.reply({
        content: "Successfuly changed the bot's status.",
        ephemeral: true,
      });
    }
  },
}/* It will be good if you write your ideas so i will make for you more easy tutorials*/