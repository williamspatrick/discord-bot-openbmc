require('dotenv').config();

var Discord = require('discord.js')
var client = new Discord.Client();

client.on(Discord.Constants.Events.CLIENT_READY, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Discord.Constants.Events.MESSAGE_CREATE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    console.log(`Msg on ${msg.channel.name} from ${msg.author.username}: ` +
        `${msg.cleanContent}`);

    if (msg.cleanContent === 'ping') {
        msg.reply('pong');
    }
});

client.on(Discord.Constants.Events.MESSAGE_UPDATE, (oldMsg, msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    console.log(`Msg on ${msg.channel.name} from ${msg.author.username} ` +
        `edited: ${oldMsg.cleanContent} -> ${msg.cleanContent}`);
});

client.on(Discord.Constants.Events.MESSAGE_DELETE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    console.log(`Msg on ${msg.channel.name} from ${msg.author.username} ` +
        `deleted: ${msg.cleanContent}`);
});

client.login(process.env.DISCORD_TOKEN);
