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
    }

    msgCreate(msg) {
        msg.reply('pong');
    }
}

module.exports = Ping;
