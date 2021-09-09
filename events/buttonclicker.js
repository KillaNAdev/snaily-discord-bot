const { MessageEmbed, Message, MessageAttachment } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands/src");

module.exports = {
    name: "clickButton",
    once: false,
    run: async(client, button) => {
        if (button.customId !== "support_ticket_create") await button.defer();
        let moderatorRole = "885198955305107476";
        let buttonMember = button.member;
        let guild = button.guild;
        let closedCategory = "885633884363038750";
        let archiveCategory = "885633884363038750";
        if (button.customId == "support_ticket_create") {
            let allChannels = client.channels.cache.filter(m => ["GUILD_TEXT", "text"].includes(m.type) && m.name.includes("ticket-")).map(m => m.name.split("ticket-")[1]);

            let already = allChannels.some(v => buttonMember.user.id == v)
            if (already === true) {
                return button.reply.send({
                    content: "Sorry, you already have ticket.",
                    ephemeral: true
                })
            }

            button.reply.send({
                content: "Creating ticket...",
                ephemeral: true
            })

            let ticketChannel = await guild.channels.create(`ticket-${buttonMember.user.id}`, {
                type: "text",
                topic: `${buttonMember.user.username}'s ticket`,
                parent: `885198955636461622`,
                permissionOverwrites: [{
                        id: buttonMember.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: moderatorRole,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }
                ]
            })

            let supportEmbed = new MessageEmbed()
                .setColor("#32a852")
                .setDescription("Support will be with you shortly.\nTo close this ticket react with :lock:")
                .setFooter("Megaton#1345")
                .setTimestamp();

            let supportButton = new MessageButton()
                .setLabel("Close")
                .setEmoji("🔒")
                .setStyle("gray")
                .setCustomId(`ticket_close_${ticketChannel.id}`)

            let claimButton = new MessageButton()
                .setLabel("Claim")
                .setEmoji("📌")
                .setStyle("gray")
                .setCustomId(`ticket_claim_${ticketChannel.id}`)

            ticketChannel.send({
                content: `<@${buttonMember.user.id}> Welcome!`,
                embeds: supportEmbed,
                allowedMentions: { parse: ["users"] },
                components: new MessageActionRow().addComponent(supportButton).addComponent(claimButton)
            })

            button.reply.edit({
                content: `Your ticket has been created. ${ticketChannel}`,
                ephemeral: true
            })
        }

        if (button.customId == `ticket_close_${button.channel.id}`) {
            let ticketChannel = button.channel;
            let createdBy = client.users.cache.get(ticketChannel.name.split("ticket-")[1]) || client.users.cache.get(ticketChannel.name.split("ticket-claimed-")[1]) || client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

            let yes = new MessageButton().setLabel("Yes").setEmoji("✅").setStyle("gray").setCustomId(`ticket_close_yes_${buttonMember.user.id}`)
            let no = new MessageButton().setLabel("No").setEmoji("❌").setStyle("gray").setCustomId(`ticket_close_no_${buttonMember.user.id}`)

            let msg = await ticketChannel.send({ content: `${buttonMember.user} Do you really want close ticket?`, components: new MessageActionRow().addComponent(yes).addComponent(no) })
            let filter = (interaction) => interaction.isButton() && buttonMember.user.id == interaction.member.user.id
            let collected = await msg.awaitMessageComponents(filter, { max: 1, time: 60000, errors: ["time"] })
            if (!collected || collected.size < 0) return msg.delete();
            msg.delete();

            let closedEmbed = new MessageEmbed()
                .setColor("#4287f5")
                .setDescription(`Ticket closed by <@${collected.first().member.user.id}>\nTicket created by <@${createdBy.id}>\n\n🔓 Reopen Ticket\n📛 Delete Ticket\n💨 Archive Ticket\n💫 Transcript Ticket`)

            let reopen = new MessageButton()
                .setLabel("Reopen")
                .setCustomId(`ticket_reopen_${ticketChannel.id}`)
                .setEmoji("🔓")
                .setStyle("green")

            let deleteButton = new MessageButton()
                .setLabel("Delete")
                .setCustomId(`ticket_delete_${ticketChannel.id}`)
                .setEmoji("📛")
                .setStyle("red")

            let archiveButton = new MessageButton()
                .setLabel("Archive")
                .setCustomId(`ticket_archive_${ticketChannel.id}`)
                .setEmoji("💨")
                .setStyle("gray")

            let transcriptButton = new MessageButton()
                .setLabel("Transcript")
                .setCustomId(`ticket_transcript_${ticketChannel.id}`)
                .setEmoji("💫")
                .setStyle("gray")

            button.channel.edit({
                name: `ticket-closed-${createdBy.id}`,
                parentID: closedCategory,
                permissionOverwrites: [{
                        id: createdBy.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: moderatorRole,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }
                ]
            })

            button.channel.send({ embeds: closedEmbed, components: new MessageActionRow().addComponents([reopen, deleteButton, archiveButton, transcriptButton]) })
        }
    }
}