import { GatewayIntentBits, Partials } from "discord.js";
import { config } from "dotenv";
import Bot from "./bot";
config();

const client = new Bot({
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent
	],

	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.ThreadMember,
		Partials.User
	]
});

(async (): Promise<void> => {
	// Checking if `-debug` was given as a flag.
	const args = process.argv;
	if (args.length > 2 && args[2] == "-debug") client.debug = !client.debug;

	// Handlers.
	await client.handleButtons();
	await client.handleSelectMenus();
	await client.handleEvents();
	await client.handleCommands(); // Refreshing application commands should be the last step before login.

	// Login.
	await client.login(process.env["TOKEN"] ?? "token-not-found???");
})();
