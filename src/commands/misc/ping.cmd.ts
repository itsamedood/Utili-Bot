/* USE THIS AS A BASE / TEMPLATE! */

import { CommandInteraction } from "discord.js";
import Command from "../../base/command";
import Bot from "../../bot";

export default class Ping extends Command {
	constructor() {
		super({
			data: {
				name: "ping",
				description: "Pong!"
			},
			category: "MISC",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		await interaction.reply({ content: `Pong!\n> 🏓 **Latency:** \`${Date.now() - interaction.createdTimestamp}ms\``, ephemeral: false });
	};
};
