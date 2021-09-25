const { Intents } = require("discord.js");
const { GCommandsClient } = require("gcommands");
const config = require('./config.js')
const mysql = require('mysql');
/*
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "oblock"
});
*/
/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
*/
const client = new GCommandsClient({
    cmdDir: "commands/",
    eventDir: "events/",
    caseSensitiveCommands: true, // true or false | whether to match the commands' caps
    caseSensitivePrefixes: true, // true or false | whether to match the prefix in message commands
    unkownCommandMessage: false, // true or false | send unkownCommand Message
    language: "english", // english, spanish, portuguese, russian, german, czech, slovak, turkish, polish, indonesian, italian
    commands: {
        slash: "both", //true = slash only, false = only normal, both = slash and normal
        context: "false", // https://gcommands.js.org/docs/#/docs/main/dev/typedef/GCommandsOptionsCommandsContext
        prefix: "$", // for normal commands
    },
    defaultCooldown: "5s",
    //    database: "url",
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
        /* DB SUPPORT
         * redis://user:pass@localhost:6379
         * mongodb://user:pass@localhost:27017/dbname
         * sqlite://path/to/database.sqlite
         * postgresql://user:pass@localhost:5432/dbname
         * mysql://user:pass@localhost:3306/dbname
         */
});

client.on("ready", () => {
    console.log(`${client.user.tag} Online!`);
    client.user.setActivity("FiveM")
});
client.on("debug", console.log); // warning | this also enables the default discord.js debug logging
client.on('guildMemberAdd', (member) => {
    let { MessageEmbed } = require("discord.js")
    console.log(`${member} Has joined.`);
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Aspect-Development')
        .setDescription(`${member} Has Joined!`)
        .setFooter("� Copyright 2021")
        .setTimestamp()

    member.guild.channels.cache.get('885198955321909256').send(embed)
    var role = member.guild.roles.cache.find(role => role.name === "Community");
    member.roles.add(role);

});
client.login(config.token);