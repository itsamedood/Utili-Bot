import { CommandInteraction } from "discord.js";
import { OptionType } from "../../base/data";
import Command from "../../base/command";
import Bot from "../../bot";

export default class Unban extends Command {
	constructor() {
		super({
			data: {
				name: "unban",
				description: "Unban a user from the server.",
				options: [
					{
						name: "userid",
						description: "The ID of the user to unban.",
						type: OptionType.STRING,
						required: true
					},
					{
						name: "reason",
						description: "The reason for unbanning the user.",
						type: OptionType.STRING,
						required: false
					}
				]
			},
			category: "MODERATION",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		let exists: boolean = true;
		const userId = interaction.options.get("userid", true).value;
		const reason = interaction.options.get("reason", false)?.value ?? "No reason given.";

		if (typeof userId != "string") return;
		if (reason != null && typeof reason != "string") return;

		// Making sure `userId` is a snowflake (18-digits).
		if (/\d{18}/.test(userId)) {
			await interaction.guild?.bans.fetch({ user: userId, cache: true })
				.then(async () => await interaction.guild?.members.unban(userId, reason))
				.catch(() => exists = !exists);

			if (exists)
				return await interaction.reply({ content: `Successfully unbanned <@${userId}>!`, ephemeral: true });
			else
				return await interaction.reply({ content: "User not found in bans!", ephemeral: true });

		} else
			return await interaction.reply({ content: "Please provide a user ID!", ephemeral: true });
	};
};
