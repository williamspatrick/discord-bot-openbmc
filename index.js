require('dotenv').config();
const path = require('path');

const Discord = require('discord.js');

const client = new Discord.Client();

const modules = require('auto-load')(path.join(__dirname, 'src'));

const objs = Object.values(modules).map((Value) => new Value(client));

client.on(Discord.Constants.Events.CLIENT_READY, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Discord.Constants.Events.MESSAGE_CREATE, (msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach((o) => {
        if (typeof o.msgCreate !== 'function') {
            return;
        }
        if (typeof o.command === 'string') {
            if (!msg.cleanContent.startsWith(`%${o.command}`)) {
                return;
            }
        }
        o.msgCreate(msg);
    });
});

client.on(Discord.Constants.Events.MESSAGE_UPDATE, (oldMsg, msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach((o) => {
        if (typeof o.msgUpdate !== 'function') {
            return;
        }
        o.msgUpdate(oldMsg, msg);
    });
});

client.on(Discord.Constants.Events.MESSAGE_DELETE, (msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach((o) => {
        if (typeof o.msgDelete !== 'function') {
            return;
        }
        o.msgDelete(msg);
    });
});

client.login(process.env.DISCORD_TOKEN);
