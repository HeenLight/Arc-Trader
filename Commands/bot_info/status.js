const {
  CommandInteraction,
  MessageEmbed,
  ClientApplication,
  ClientUser,
} = require("discord.js");
const process = require("process");
const OS = require("node:os");
var osu = require("node-os-utils");

module.exports = {
  name: "status",
  description: "Status of host machine",
  permission: "SEND_MESSAGES",

  async execute(interaction, client) {
    var cpu = osu.cpu;
    var osCmd = osu.osCmd;
    var mem = osu.mem;
    var os = osu.os;

    const sysUptime = await os.uptime();
    const procUptime = process.uptime();
    const cpuUsage = (await cpu.usage()) + "%";
    //const freeMem = (await mem.free()) + "MB";
    const freeMem = (await mem.info()).freeMemMb + "MB";
    const operatingSystem = `\`${OS.version()} (${OS.platform()}, ${OS.arch()}, ${os.hostname()})\``;
    const bot = client.user.tag;
    const botAvatar = client.user.displayAvatarURL();
    const gif = [
      "https://media.tenor.com/XUD0K8qLJYsAAAAd/how-linux-users-install-a-web-browser-linux.gif",
      "https://media.tenor.com/tuZ4rLItql8AAAAd/raspberry-pi-fire.gif",
    ];

    //math convertations for uptimes
    if (sysUptime < 60) {
      sysUp = `${sysUptime} seconds`;
    } else if (sysUptime < 3600) {
      sysUp = `${parseFloat(sysUptime / 60).toFixed(1)} minutes`;
    } else if (sysUptime < 86400) {
      sysUp = `${parseFloat(sysUptime / 3600).toFixed(1)} hours`;
    } else if (sysUptime < 2592000) {
      sysUp = `${parseFloat(sysUptime / 86400).toFixed(1)} days`;
    } else if (sysUptime < 31536000) {
      sysUp = `${parseFloat(sysUptime / 2592000).toFixed(1)} months`;
    } else {
      sysUp = `${parseFloat(sysUptime / 31536000).toFixed(1)} years`;
    }

    //for process time
    if (procUptime < 60) {
      procUp = `${procUptime} seconds`;
    } else if (procUptime < 3600) {
      procUp = `${parseFloat(procUptime / 60).toFixed(1)} minutes`;
    } else if (procUptime < 86400) {
      procUp = `${parseFloat(procUptime / 3600).toFixed(1)} hours`;
    } else if (procUptime < 2592000) {
      procUp = `${parseFloat(procUptime / 86400).toFixed(1)} days`;
    } else if (procUptime < 31536000) {
      procUp = `${parseFloat(procUptime / 2592000).toFixed(1)} months`;
    } else {
      procUp = `${parseFloat(procUptime / 31536000).toFixed(1)} years`;
    }

    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor({ name: `${bot}`, iconURL: `${botAvatar}` })
      .setDescription(`Bot uptime: \`${procUp}\``)
      .addFields({
        name: `Host machine uptime`,
        value: `\`${sysUp}\``,
        inline: true,
      })
      .addFields({ name: `CPU Usage`, value: `\`${cpuUsage}\``, inline: true })
      .addFields({ name: `Free RAM`, value: `\`${freeMem}\``, inline: true })
      .addFields({
        name: `Host machine OS`,
        value: `${operatingSystem}`,
        inline: true,
      })
      .setImage(gif[Math.floor(Math.random() * gif.length)]);

    interaction.reply({ embeds: [embed] });
  },
};
