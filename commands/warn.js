const { Command } = require("gcommands");
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
    // credits to faxes for part of the warn command didndt know how to do the json part
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "warn",
            description: "Help Command!",
            cooldown: "5s",
            userRequiredPermissions: "MANAGE_MESSAGES", // Permission, [Permission, Permission]
        });
    }

    run({ client, respond, interaction, message }, args) {
        message.delete();
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        //       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
        let wUser = message.mentions.members.first();
        if (!wUser) return message.reply("Invalid user.").then(msg => msg.delete(5000));
        //    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't touch them.").then(msg => msg.delete(5000));
        let reason = args.join(" ").slice(22);

        if (!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };

        if (!reason) {
            reason = "N/A";
        }

        if (warns > 5) {
            wUser.ban({
                reason: "This user has received over 5 warnings in this guild and has been kicked therefore.",
            }).then(() => {
                const BannedPersonEmbed = new MessageEmbed()
                    .setColor('#00ffff')
                    .setTitle('Admin Bot', 'https://alv.gg/img/Alv.Gif', 'https://alv.gg')
                    .setDescription(`${wUser} has been banned from this guild for more than 5 warnings (Reason: Rule Violations)`)
                    .setFooter("© Copyright 2021")
                    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true })}`)
                    .setTimestamp()
                message.channel.send(BannedPersonEmbed)
            })
        }

        warns[wUser.id].warns++;

        fs.writeFile("warnings.json", JSON.stringify(warns, null, 4), (err) => {
            if (err) console.log(err)
        });

        let warnEmbed = new MessageEmbed()
            .setAuthor("Aspect-Development", `https://cdn.discordapp.com/attachments/885198956957663271/887094052087005204/download.png`)
            .setColor("#0a99f5")
            .setDescription(`Warned ${args[0]}. Reason: ${reason}`)

        //   let warnChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].warning_logs_channel);
        // if(!warnChannel) return console.log("Channel not found (Config: 'warning_logs_channel')");

        message.channel.send(warnEmbed);

        //   if(warns[wUser.id].warns == 1){
        //     message.channel.send(`<@${wUser.id}> has been warned for: ${reason}`);
        //}

    }
}
