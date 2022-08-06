import { ChannelType, CommandInteraction, EmbedBuilder } from "discord.js";
import Command from "../../base/command";
import Bot from "../../bot";
import axios from "axios";

export default class Meme extends Command {
	constructor() {
		super({
			data: {
				name: "meme",
				description: "Fetch a random meme from Reddit."
			},
			category: "FUN"
		});
	};

	async execute(interaction: CommandInteraction, client: Bot) {
		const baseUrl = "https://meme-api.herokuapp.com/gimme";

		axios
			.get(baseUrl)
			.then(async (res) => {
				const data: MemeData = res.data;

				if ((data.nsfw) && interaction.channel?.type == ChannelType.GuildText && !interaction.channel.nsfw)
					return await interaction.reply({ content: "The meme was marked as NSFW, and since this isn't an NSFW channel, I didn't send it.", ephemeral: false });

				const memeEmbed = new EmbedBuilder({
					title: data.title,
					url: data.url,
					color: 0xFF4500,
					author: { name: `u/${data.author}`, url: `https://www.reddit.com/user/${data.author}/` },
					image: { url: data.preview[data.preview.length - 1] },
					footer: { text: `r/${data.subreddit} | ${data.ups} ⬆️`, icon_url: "https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png" }
				});

				return await interaction.reply({ embeds: [memeEmbed], ephemeral: false });
			});
	};
};

interface MemeData {
	postLink: string;
	subreddit: string;
	title: string;
	url: string;
	nsfw: boolean;
	spoiler: boolean;
	author: string;
	ups: bigint;
	preview: string[];
}
