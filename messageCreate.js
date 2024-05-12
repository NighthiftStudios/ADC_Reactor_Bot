const { Events } = require('discord.js');


module.exports = {
	name: Events.MessageCreate,
	async execute(config, message) {
		if (message.author.bot) return;
        if (message.channel.id != config.reactionChannel) return;
        if (message.member.roles.cache.some(role => config.exemptRoles.includes(role.id))) return;
        if (config.exemptUsers.includes(message.author.id)) return;
        await message.react(config.proEmoji)
        await message.react(config.conEmoji)
        await message.startThread({ "name": message.author.username + "'s Suggestion"})
	},
};