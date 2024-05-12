const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, GuildInviteManager } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(config, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(config, ...args));
	}
}

client.login(token);