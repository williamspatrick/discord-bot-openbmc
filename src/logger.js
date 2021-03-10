class Logger {
    constructor() {
    }

    msg_create(msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username}: ` +
            `${msg.cleanContent}`);
    }

    msg_update(oldMsg, msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username} ` +
            `edited: ${oldMsg.cleanContent} -> ${msg.cleanContent}`);
    }

    msg_delete(msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username} ` +
            `deleted: ${msg.cleanContent}`);
    }
}

module.exports = Logger;
