/* eslint class-methods-use-this: [
    "error",
    { "exceptMethods": [
        "msgCreate",
        "msgUpdate",
        "msgDelete",
      ]
    }
]
 */

class Logger {
    msgCreate(msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username}: `
            + `${msg.cleanContent}`,
        );
    }

    msgUpdate(oldMsg, msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username} `
            + `edited: ${oldMsg.cleanContent} -> ${msg.cleanContent}`,
        );
    }

    msgDelete(msg) {
        console.log(
            `Msg on ${msg.channel.name} from ${msg.author.username} `
            + `deleted: ${msg.cleanContent}`,
        );
    }
}

module.exports = Logger;
