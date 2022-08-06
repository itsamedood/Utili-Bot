import { SelectMenuInteraction } from "discord.js";
import SelectMenu from "../base/selectMenu";
import Bot from "../bot";

export default class TestSelectMenu extends SelectMenu {
	constructor() { super({ customId: "testSelectMenu" }); };

	async execute(interaction: SelectMenuInteraction, client: Bot) {
		await interaction.reply({ content: `Got: [ ${interaction.values} ]!`, ephemeral: true });
	};
};
