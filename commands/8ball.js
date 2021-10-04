const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const { config } = require('../config.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "8ball",
            description: "!",
            cooldown: "10s",
            //      userRequiredPermissions: "MANAGE_MESSAGES", // Permission, [Permission, Permission]
        });
    }

    async run({ client, respond, interaction, message }, args) {

        let aws = [
            "Yes",
            "No",
            "Not sure, Try again",
            "Maybe"
        ]

        let question = args.slice(0).join(' ');
        // idk math lol https://stackoverflow.com/questions/47999893/discord-js-8ball-isnt-producing-random-results needed to use that me dont know math
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Aspect-Development')
            .setDescription("**Question:** " + question + " \n\n**Awnser:** " + aws[Math.floor(Math.random() * aws.length)])
            .setTimestamp()
            .setFooter("Magic!")
        respond(embed)




    }
}
