const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "clear",
            description: "Help Command!",
            cooldown: "10s",
            userRequiredPermissions: "MANAGE_MESSAGES", // Permission, [Permission, Permission]
        });
    }

    async run({ client, respond, interaction, message }, args) {
        let delamount = args[0];
        if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply('Error:')

        if (parseInt(delamount) > 100) return message.reply('you cant delete 100 messages at a time!')

        await message.channel.bulkDelete(parseInt(delamount) + 1, true);
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true })}`)
            .setTitle('Megaton-Development')
            .setDescription(`Cleared!`)
            .setFooter("© Copyright 2021")
        await message.channel.send(embed).then(m => {
            setTimeout(() => {
                    m.delete()
                }, 5000) // 5 seconds
        })




        //      respond(embed);

    }
}