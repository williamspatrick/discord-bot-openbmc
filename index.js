require('dotenv').config();

var Discord = require('discord.js');
var client = new Discord.Client();
var Logger = require('./src/logger.js');
var logger = new Logger();

client.on(Discord.Constants.Events.CLIENT_READY, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Discord.Constants.Events.MESSAGE_CREATE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    logger.msg_create(msg);

    if (msg.cleanContent === 'ping') {
        msg.reply('pong');
    }
});

client.on(Discord.Constants.Events.MESSAGE_UPDATE, (oldMsg, msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    logger.msg_update(oldMsg, msg);
});

client.on(Discord.Constants.Events.MESSAGE_DELETE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    logger.msg_delete(msg);
});

client.login(process.env.DISCORD_TOKEN);
