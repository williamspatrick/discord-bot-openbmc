/* eslint class-methods-use-this: [
    "error",
    { "exceptMethods": [
        "msgCreate"
      ]
    }
]
 */

class Ping {
    msgCreate(msg) {
        if (msg.cleanContent === 'ping') {
            msg.reply('pong');
        }
    }
}

module.exports = Ping;
