import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { OptionType } from "../../base/data";
import Command from "../../base/command";
import Bot from "../../bot";

export default class EightBall extends Command {
	constructor() {
		super({
			data: {
				name: "8ball",
				description: "Ask the magic 8-ball anything!",
				options: [
					{
						name: "question",
						description: "The question you want to ask (must end with a '?').",
						required: true,
						type: OptionType.STRING
					}
				]
			},
			category: "FUN",
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		const question = interaction.options.get("question", true); // Thanks Discord.JS v14, very cool.

		// Ensuring a question was entered.
		if ((question.type == ApplicationCommandOptionType.String && typeof question.value == "string") && !question.value.endsWith("?")) return await interaction.reply({ content: "Your question is not a question! (Make sure you ended it with a '?')", ephemeral: true });

		const answers: string[] = [
			// YES //
			"Yes, all the yes.",
			"100%",
			"Definitely, absolutely.",
			"Ohhhhhhh yeeeeeaaaaaaah~",
			"No... SIKE!",

			// MAYBE //
			"I mean, maybe?",
			"Possibly so.",
			"I could see it.",
			"Probably.",
			"Probably not.",

			// NONE //
			"Uhhhhhhhhhhhhhhhhhhhhh-",
			"I don't know about that one...",
			"I'll have to think and let you know tomorrow.",
			"What?",
			"How would I know?",

			// NO //
			"No, absolutely not.",
			"Yeeeeeeeaaaaaah... ||no.||",
			"Sorry, but that's gonna be a hard no.",
			"I'm gonna have to go with a no on that one.",
			"Yes... SIKE!"
		];

		const responseEmbed = new EmbedBuilder()
			.addFields(
				{ name: "Question", value: `${question.value}`, inline: true },
				{ name: "Answer", value: `**${answers[~~(Math.random() * answers.length)]}**`, inline: true }
			);

		await interaction.reply({ embeds: [responseEmbed], ephemeral: false });
	};
};
