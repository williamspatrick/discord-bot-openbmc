class Ping {
    constructor() {
    }

    msg_create(msg) {
        if (msg.cleanContent === 'ping') {
            msg.reply('pong')
        }
    }
}

module.exports = Ping;
