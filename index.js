const Discord = require('discord.js');
const bot = new Discord.Client();
var channelCreate = false;

bot.on("ready", () => {
    console.log('Stats are online');
    bot.user.setActivity(`SweetSpot Stats`, { type: "WATCHING" });
    setInterval(() => {
        bot.guilds.map((c) => {
            c.channels.map((c) => {
                if (c.name.includes("Members:")) {
                    c.setName(`Members: ${c.guild.memberCount}`)
                    console.log("Updated!");
                } else {
                }
            });
        });
    }, 1000);
});

bot.on("message", (msg) => {
    if (msg.content === "st!setup") {
        console.log("Works");
        msg.guild.channels.map((c) => {
            if (c.name.includes("Members:")) {
                channelCreate = true;
                return;
            }
        });
        if (channelCreate == false) {
            msg.guild.createChannel(`Members: ${msg.guild.memberCount}`, "voice").then(
                (chan) => {
                    chan.overwritePermissions(msg.guild.roles.find('name', '@everyone'), {
                        'CONNECT' : false,
                        'VIEW_CHANNEL' : true
                    });
                }
            ).catch(console.error);
        }
    }
});

bot.token = process.env.token;
bot.login();