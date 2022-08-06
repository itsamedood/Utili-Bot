import { EmbedBuilder } from "@discordjs/builders";
import { ButtonBuilder, CommandInteraction, ActionRowBuilder, ComponentType, ButtonStyle, SelectMenuBuilder } from "discord.js";
import Command from "../../base/command";
import Bot from "../../bot";

export default class Test extends Command {
    constructor() {
        super({
            data: {
                name: "test",
                description: "testiiiiiiing"
            },
            category: "DEV_ONLY",
        });
    };

    async execute(interaction: CommandInteraction, client: Bot) {
        const selectMenuRow = new ActionRowBuilder<SelectMenuBuilder>({
            components: [
                new SelectMenuBuilder({
                    customId: "testSelectMenu",
                    maxValues: 1,
                    minValues: 1,
                    options: [
                        {
                            label: "option1",
                            description: "1st test option.",
                            value: "uno"
                        },
                        {
                            label: "option2",
                            description: "2nd test option.",
                            value: "dos"
                        }
                    ]
                })
            ]
        });

        const embed = new EmbedBuilder()
            .setTitle("TEST EMBED :D")
            .setDescription("woah a wild thing appeared what");

        await interaction.deferReply({ ephemeral: true, fetchReply: true });

        setTimeout(async () => {
            await interaction.editReply({ embeds: [embed], components: [selectMenuRow] });
        }, 2.5e3);
    };
};
