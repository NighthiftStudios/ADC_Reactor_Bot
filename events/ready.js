const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(config, client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
