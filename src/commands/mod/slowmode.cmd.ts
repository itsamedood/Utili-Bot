import { ChannelType, CommandInteraction, PermissionsBitField } from "discord.js";
import { OptionType } from "../../base/data";
import Command from "../../base/command";
import Bot from "../../bot";

export default class SlowMode extends Command {
	constructor() {
		super({
			data: {
				name: "slowmode",
				description: "Set the slowmode for a channel.",
				options: [
					{
						name: "time",
						description: "The amount of time to set the slowmode to.",
						type: OptionType.INTEGER,
						required: true
					},
					{
						name: "unit",
						description: "The unit of time (s,m,h).",
						type: OptionType.STRING,
						required: false
					},
					{
						name: "reason",
						description: "The reason for setting the slowmode.",
						type: OptionType.STRING,
						required: false
					}
				]
			},
			userPermissions: [PermissionsBitField.Flags.ManageChannels],
			category: "MODERATION",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		let time = interaction.options.get("time", true).value; // Integer.
		const unit = interaction.options.get("unit", false)?.value ?? "s"; // String.
		const reason = interaction.options.get("reason", false)?.value ?? "No reason given." // String.

		// Type checking, wooooo.
		if (typeof time != "number") return;
		if (typeof unit != "string") return;
		if (typeof reason != "string") return;
		if (interaction.channel?.type != ChannelType.GuildText) return;

		switch (unit) {
			case "s":
				if (time >= 21600) return await interaction.reply({ content: "Maximum time that can be set is 6h.", ephemeral: true });

				interaction.channel.setRateLimitPerUser(time, reason);
				return await interaction.reply({ content: `Slowmode set to **${time}${unit}**.`, ephemeral: true });

			case "m":
				time = (time * 60);
				if (time >= 21600) return await interaction.reply({ content: "Maximum time that can be set is 6h.", ephemeral: true });

				interaction.channel.setRateLimitPerUser(time, reason);
				return await interaction.reply({ content: `Slowmode set to **${time / 60}${unit}**.`, ephemeral: true });

			case "h":
				time = (time * 60) * 60;
				if (time >= 21600) return await interaction.reply({ content: "Maximum time that can be set is 6h.", ephemeral: true });

				interaction.channel.setRateLimitPerUser(time, reason);
				return await interaction.reply({ content: `Slowmode set to **${time / (time / 60) / 60}${unit}**.`, ephemeral: true });

			default:
				return await interaction.reply({ content: `Unit does not match 's', 'm', or 'h'.` });
		}
	};
};
