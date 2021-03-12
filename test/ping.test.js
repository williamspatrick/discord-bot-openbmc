const { Message } = require('discord.js');
const Ping = require('../src/ping');

const ping = new Ping();

describe('ping-tests', () => {
    it('module loaded', () => {
        expect.assertions(2);
        expect(typeof ping).not.toBe('undefined');
        expect(typeof ping).toBe('object');
    });

    it('msgCreate exists', () => {
        expect.assertions(1);
        expect(typeof ping.msgCreate).toBe('function');
    });

    it('msgCreate replies with "pong"', () => {
        expect.assertions(2);

        const msg = new Message();
        ping.msgCreate(msg);

        expect(msg.reply.mock.calls).toHaveLength(1);
        expect(msg.reply).toHaveBeenCalledWith('pong');
    });
});
