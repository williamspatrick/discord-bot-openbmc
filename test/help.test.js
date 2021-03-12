const Discord = require('discord.js');

const { Message, MessageEmbed } = Discord;

const Help = require('../src/help');

describe('help-tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('module loaded and constructable', () => {
        expect.assertions(2);
        expect(typeof Help).toBe('function');

        const help = new Help();
        expect(typeof help).toBe('object');
    });

    it('no valid modules creates no help', () => {
        expect.assertions(3);

        const help = new Help({ openbmc_objects: [] });
        const msg = new Message();
        help.msgCreate(msg);

        expect(msg.reply.mock.calls).toHaveLength(1);
        expect(MessageEmbed.mock.instances).toHaveLength(1);

        const reply = MessageEmbed.mock.instances[0];
        expect(reply.addField).not.toHaveBeenCalled();
    });

    it('one valid module creates help', () => {
        expect.assertions(3);

        const help = new Help({
            openbmc_objects: [
                {
                    command: 'foobar',
                    help: [{ command: 'foo', short: 'bar' }],
                },
            ],
        });

        const msg = new Message();
        help.msgCreate(msg);

        expect(msg.reply.mock.calls).toHaveLength(1);
        expect(MessageEmbed.mock.instances).toHaveLength(1);

        const reply = MessageEmbed.mock.instances[0];
        expect(reply.addField).toHaveBeenCalledWith('foo', 'bar', true);
    });

    it('missing help test creates single entry', () => {
        expect.assertions(3);

        const help = new Help({
            openbmc_objects: [
                { command: 'foo' },
            ],
        });

        const msg = new Message();
        help.msgCreate(msg);

        expect(msg.reply.mock.calls).toHaveLength(1);
        expect(MessageEmbed.mock.instances).toHaveLength(1);

        const reply = MessageEmbed.mock.instances[0];
        expect(reply.addField).toHaveBeenCalledWith('foo', 'foo', true);
    });

    it('three valid module creates help', () => {
        expect.assertions(5);

        const help = new Help({
            openbmc_objects: [
                { command: 'foo' },
                { command: 'bar' },
                { command: 'baz' },
            ],
        });

        const msg = new Message();
        help.msgCreate(msg);

        expect(msg.reply.mock.calls).toHaveLength(1);
        expect(MessageEmbed.mock.instances).toHaveLength(1);

        const reply = MessageEmbed.mock.instances[0];
        expect(reply.addField).toHaveBeenCalledWith('foo', 'foo', true);
        expect(reply.addField).toHaveBeenCalledWith('bar', 'bar', true);
        expect(reply.addField).toHaveBeenCalledWith('baz', 'baz', true);
    });
});
