const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageReactionAdd,
	once: false,
	execute(config, MessageReaction) {
		if (MessageReaction.message.channel.id != config.reactionChannel) return;
        if (MessageReaction.emoji.id != config.proReaction) return;
        if (MessageReaction.count >= config.threshold) {
            console.log(MessageReaction.count)
            const suggestion = MessageReaction.message.content
            console.log(MessageReaction.message.content)
            const msg = MessageReaction.message
            const embed = {
                title: msg.author.username + '\'s suggestion',
                url: msg.url,
                author: {
                    name: 'ADC Suggestion Handler',
                    icon_url: msg.guild.iconURL(),
                    url: '',
                },
                description: msg.content,
                thumbnail: {
                    url: msg.author.avatarURL(),
	            },
                footer: {
                    text: 'Suggestion got at least ' + config.threshold + " upvotes.",
                    icon_url: msg.guild.iconURL(),
                },
            }
            const timsChannel = MessageReaction.message.guild.channels.fetch(config.thresholdChannel)
                .then(channel => {channel.send({ embeds: [embed]})})
                .catch(console.error)
        }
	},
};