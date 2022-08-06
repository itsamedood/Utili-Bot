import { ActivityType } from "discord.js";
import { print } from "../utils/print";
import Event from "../base/event";
import Bot from "../bot";

export default class Ready extends Event {
	constructor() {
		super({ name: "ready", once: true });
	};

	public async execute(client: Bot) {
		if (!client.user) return;

		client.user.setPresence({
			status: !client.debug ? "dnd" : "idle",
			activities: [{
				name: !client.debug ? "for /help!" : "out for bugs...",
				type: ActivityType.Watching,
				url: "https://github.com/itsamedood/"
			}]
		});

		print(`/fg_yellow/[🤖]/st_reset/ /fg_green/Logged in as /st_bold/${client.user.tag}/st_reset/!`);
	};
};
