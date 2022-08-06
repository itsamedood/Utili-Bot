import { CommandInteraction, EmbedBuilder } from "discord.js";
import { OptionType } from "../../base/data";
import { getEmoji, UtiliMoji } from "../../utils/emoji";
import Command from "../../base/command";
import Bot from "../../bot";

export default class Help extends Command {
	constructor() {
		super({
			data: {
				name: "help",
				description: "Get some help.",
				options: [
					{
						name: "command",
						description: "The command to get help with.",
						type: OptionType.STRING,
						required: false
					}
				],
			},
			category: "MISC",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		const command = interaction.options.get("command", false)?.value ?? null;

		if (command != null && typeof command == "string") {
			const commandData = client.commands.get(command)?.data ?? null;
			if (commandData == null) return await interaction.reply({ content: `'${command}' is not a command! Run \`/help\` for a list of commands.` });

			const fields: { name: string, value: string, inline: boolean }[] = [];

			if (commandData.options != null)
				for (const option of commandData.options) {
					fields.push({
						name: `${getEmoji(client, UtiliMoji.OPTION)} ${option.name}`,
						value: `Required: ${option.required ? getEmoji(client, UtiliMoji.YES) : getEmoji(client, UtiliMoji.NO)}`,
						inline: true
					});
				}

			const commandEmbed = new EmbedBuilder({
				title: commandData.name,
				description: commandData.description,
				fields: fields
			});

			return await interaction.reply({ embeds: [commandEmbed], ephemeral: true });
		} else {
			const commandListEmbed = new EmbedBuilder({
				title: "Commands:",
				description: client.commands.map(cmd => `• __**${cmd.data.name}**__`).join("\n"),
				footer: { text: "Tip: Use `/help command-name` to get help with a specific command." }
			});

			return await interaction.reply({ embeds: [commandListEmbed], ephemeral: true });
		}
	};
};
