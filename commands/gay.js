const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "gay",
            description: "!",
            cooldown: "10s",
            //      userRequiredPermissions: "MANAGE_MESSAGES", // Permission, [Permission, Permission]
        });
    }

    async run({ client, respond, interaction, message }, args) {
        //[Math.floor(Math.random() * aws.length)]
        let array = [
            "Yes",
            "No",
            "Try Again",

        ];

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Gay Test!')
            .setDescription("**Are You gay? " + "Aswner: " + array[Math.floor(Math.random() * array.length)] + "**")
        respond(embed)



    }
}
