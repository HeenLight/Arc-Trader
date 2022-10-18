const { CommandInteraction, MessageEmbed, Interaction } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Deletes messages (Staff Only)",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description: "Specified number messages for deleting",
      type: "NUMBER",
      required: true
    },
    {
      name: "target",
      description: "The user to clear messages",
      type: "USER",
      required: false
    },
  ], //these line define arguments for your command, i   e dont choe   TARGET then its delete amount from channel loke 10 or 100(100 is max)
  /**
   * @param {CommandInteraction} intrc   ion
   * @param {Client} client
    */

  //its all incorrect, after defining command properties you should write watch ->

  //here you start writing code that will be executed when you write /commandname in discord
  async execute(interaction) {
    const { channel, options } = interaction//getting channel id and opyionns from command( its called interaction)
    const amount = options.getNumber("amount")//getting number of messages
    const target = options.getUser("target")//getting target for deleting messages its all goes from interaction

    const Messages = await channel.messages.fetch();//getting all messages in channel where command executed

    const response = new MessageEmbed()//defining parameters for our embed message
      .setColor("GREEN")

    //now big function
    if (target) {//if we have target defined started this code
      let i = 0;
      const filter = []; //making filter to delete messages only from target user
      (await Messages).filter((m) => {
        if (m.author.id === target.id && amount !== i) {
          filter.push(m);
          i++;
        }
      })//end of filter function
      await channel.bulkDelete(filter, true).then(messages => {
        response.setDescription(`Cleared ${messages.size} from ${target}.`)//adding for our MessageEmbed description wgere define how mych we deleted and from who
        interaction.reply({ embeds: [response] });
      })
    } else {//if not target
      await channel.bulkDelete(amount, true).then(messages => {//if you watch arguments for channel.bulkDelete, you will see that when we have target we defined filter so we delete messages only from target, Here if we dont have target its delete just amount.Remember how do it
        response.setDescription(`Cleared ${messages.size} from this channel.`)//same adding but without target
        interaction.reply({ embeds: [response] });//sending message as reply for command
      })
    }
  }
}