const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow, Command } = require("gcommands");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "sendpanel",
            description: "Send panel :O",
            guildOnly: "885198955305107467",
            userRequiredPermissions: "ADMINISTRATOR",
        })
    }

    async run({ client, channel, respond }) {
        let embed = new MessageEmbed()
            .setAuthor(`Megaton#1345`, `https://cdn.discordapp.com/attachments/885198956957663271/885632331543633920/New_Project_1background.png`)
            .setDescription("Questions?")
            .setColor("#fcba03")
            .setFooter("© Megaton 2021");

        embed.setTimestamp()

        let button = new MessageButton()
            .setLabel("Support")
            .setStyle("red")
            .setCustomId("support_ticket_create")

        let button1 = new MessageButton()
            .setLabel("Tebex Support!")
            .setStyle("red")
            .setCustomId("support_ticket_create")

        respond({
            content: "Sended!",
            ephemeral: true
        })

        channel.send({
            content: embed,
            inlineReply: true,
            components: new MessageActionRow().addComponents([button])
        })
    }
};

// Credits https://github.com/Garlic-Team/TicketBot This is a modfied verison.