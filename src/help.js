const Discord = require('discord.js');

class Help {
    constructor(client) {
        this.client = client;
        this.command = 'help';
        this.help = [
            { command: 'help', short: 'Show commands' },
        ];
    }

    msgCreate(msg) {
        const embed = new Discord.MessageEmbed();
        this.client.openbmc_objects.forEach((o) => {
            if (typeof o.command !== 'string') {
                return;
            }
            if (typeof o.help !== 'object') {
                embed.addField(o.command, o.command, true);
                return;
            }

            o.help.forEach((h) => {
                embed.addField(h.command, h.short, true);
            });
        });
        msg.reply(embed);
    }
}

module.exports = Help;
