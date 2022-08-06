import { ApplicationCommandOptionType, ChannelType, CommandInteraction } from "discord.js";
import { OptionType } from "../../base/data";
import Command from "../../base/command";
import Bot from "../../bot";

export default class Purge extends Command {
	constructor() {
		super({
			data: {
				name: "purge",
				description: "Purge x amount of messages.",
				options: [
					{
						name: "x",
						description: "Amount of messages to delete.",
						type: OptionType.INTEGER,
						required: true,
					}
				]
			},
			category: "MODERATION",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		const x = interaction.options.get("x", true).value;
		if (typeof x != "number") return;

		if (x > 100) return await interaction.reply({ content: "Cannot delete more than 100 messages at a time.", ephemeral: true });

		if (interaction.channel?.type == ChannelType.GuildText) {
			const deletedMessages = await interaction.channel.bulkDelete(x, true);

			if (deletedMessages.size < 1) return await interaction.reply({ content: "No messages were deleted.", ephemeral: true });

			return await interaction.reply({ content: `Deleted **${deletedMessages.size}** messages!`, ephemeral: true });
		}
	};
};
