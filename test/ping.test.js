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
        expect.assertions(1);
        ping.msgCreate({
            reply: (text) => {
                expect(text).toBe('pong');
            },
        });
    });
});
