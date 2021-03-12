/* eslint class-methods-use-this: [
    "error",
    { "exceptMethods": [
        "msgCreate"
      ]
    }
]
 */

class Ping {
    constructor() {
        this.command = 'ping';
        this.help = [
            { command: 'ping', short: 'Responds with a "pong"' },
        ];
    }

    msgCreate(msg) {
        msg.reply('pong');
    }
}

module.exports = Ping;
