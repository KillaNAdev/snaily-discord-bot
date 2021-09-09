const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
//const { MessageEmbed } = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            description: "Ban Command!",
            cooldown: "10s",
            userRequiredPermissions: "MANAGE_MESSAGES", // Permission, [Permission, Permission]
        });
    }

    async run({ client, respond, interaction, message }, args) {
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Who am I gonna ban????');

        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                const banned = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Megaton-Development')
                    .setDescription(`Banned! ${user}`)
                    .setFooter("© Copyright 2021")
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true })}`)
                    .setTimestamp()
                message.channel.send(banned)
            })

        } else {
            const couldnotfind = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Megaton-Development')
                .setDescription('Could not ban that user!')
                .setFooter("© Copyright 2021")
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true })}`)
                .setTimestamp()
            message.channel.send(couldnotfind);
        }

        //      respond(embed);

    }
}