import { CommandInteraction, InteractionType, EmbedBuilder, ButtonInteraction, SelectMenuInteraction, ChannelType } from "discord.js";
import { getEmoji, UtiliMoji } from "../utils/emoji";
import Command from "../base/command";
import Event from "../base/event";
import Bot from "../bot";

/**
 * Array of developers' IDs.
 */
const developers: string[] = ["743679520107790416"];

export default class InteractionCreate extends Event {
	constructor() { super({ name: "interactionCreate" }); };

	async execute(client: Bot, interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction) {
		/* Slash Command Interactions */
		if (interaction.type === InteractionType.ApplicationCommand) {
			if (interaction?.channel?.type == ChannelType.DM) return;

			const command: Command | undefined = client.commands.get(interaction?.commandName);
			if (!command) return;

			// Checking for debug mode or if the command is DEV_ONLY.
			if ((client.debug || command.category == "DEV_ONLY") && !developers.includes(interaction.user.id)) return interaction.reply({ content: "**You cannot use this command right now. Sorry for the inconvenience.**", ephemeral: true });

			// Checking permissions for the user.
			const urPerms = command?.userPermissions ?? [];

			if (!interaction.memberPermissions?.has(urPerms, true))
				return await interaction.reply({ content: `${getEmoji(client, UtiliMoji.ERROR)} You don't have permission to use this command!`, ephemeral: true });

			try {
				await command.execute(interaction, client);
			} catch (err) {
				const errorEmbed = new EmbedBuilder({
					title: "Error while executing interaction:",
					description: `\`\`\`ts\n${err}\n\`\`\``
				}).setColor("#FF0000");

				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				console.error(err);
			}
		}

		/* Button Interactions */
		else if (interaction.isButton()) {
			const button = client.buttons.get(interaction?.customId);

			if (!button) return interaction.reply({ content: "No code for this button was found :(", ephemeral: true });

			try {
				await button.execute(interaction, client);
			} catch (err) {
				const errorEmbed = new EmbedBuilder({
					title: "Error while executing button:",
					description: `\`\`\`ts\n${err}\n\`\`\``
				}).setColor("#FF0000");

				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				console.error(err);
			}
		}

		/* Select Menu Interactions */
		else if (interaction.isSelectMenu()) {
			const selectMenu = client.selectMenus.get(interaction?.customId);

			if (!selectMenu) return interaction.reply({ content: "No code for this selection was found :(", ephemeral: true });

			try {
				await selectMenu.execute(interaction, client);
			} catch (err) {
				const errorEmbed = new EmbedBuilder({
					title: "Error while executing selection:",
					description: `\`\`\`ts\n${err}\n\`\`\``
				}).setColor("#FF0000");

				await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
				console.error(err);
			}
		}
	};
};
