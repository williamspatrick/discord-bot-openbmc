require('dotenv').config();

var Discord = require('discord.js');
var client = new Discord.Client();

var modules = require('auto-load')(__dirname + '/src');
var objs = Object.entries(modules).map(([key, value]) => new value());

client.on(Discord.Constants.Events.CLIENT_READY, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Discord.Constants.Events.MESSAGE_CREATE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach(o => {
        if (typeof o.msg_create == 'function') {
            o.msg_create(msg);
        }
    });
});

client.on(Discord.Constants.Events.MESSAGE_UPDATE, (oldMsg, msg) => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach(o => {
        if (typeof o.msg_update == 'function') {
            o.msg_update(oldMsg, msg);
        }
    });
});

client.on(Discord.Constants.Events.MESSAGE_DELETE, msg => {
    if ((msg.channel.type !== 'text') || (!msg.cleanContent)) {
        return;
    }
    objs.forEach(o => {
        if (typeof o.msg_delete == 'function') {
            o.msg_delete(msg);
        }
    });
});

client.login(process.env.DISCORD_TOKEN);
