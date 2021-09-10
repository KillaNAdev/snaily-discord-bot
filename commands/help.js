const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "help",
            description: "Help Command!",
            cooldown: "5s",
            // userRequiredPermissions: "ADMINISTRATOR", // Permission, [Permission, Permission]
        });
    }

    run({ client, respond, interaction, message }, args) {
        message.delete()
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true })}`)
            .setTitle('Megaton-Development')
            .setDescription(`**Bot: 🟢**\n`)
            .addFields({ name: '**Commands**', value: '\n\n Check Below for commands.', inline: true }, { name: '$clear', value: 'Clears an channel.', inline: false }, { name: '$ban', value: 'Bans an member.', inline: false }, { name: '$whitelist', value: 'Magic.', inline: false }, )

        respond(embed);
    }
}
