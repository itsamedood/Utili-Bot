import { Client, ClientOptions, Collection, CommandInteraction } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { SlashCommandData } from "./base/data";
import { promisify } from "util";
import { print } from "./utils/print";
import glob from "glob";
import Command from "./base/command";
import Event from "./base/event";
import Button from "./base/button";
import SelectMenu from "./base/selectMenu";

/**
 * Main bot class.
 */
export default class Bot extends Client {
    public commands = new Collection<string, Command>();
    public events = new Collection<string, Event>();
    public buttons = new Collection<string, Button>();
    public selectMenus = new Collection<string, SelectMenu>();
    public commandJSONArray: SlashCommandData[] = [];
    public debug: boolean = false;

    constructor(options: ClientOptions) { super(options); };

    /* === HANDLER METHODS === */

    /**
     * Handles commands.
     * @param debug If `true`, application commands are loaded only for the test guild and not globally.
     */
    public async handleCommands(): Promise<void> {
        const plob = promisify(glob); // Promisify glob.
        const commandFiles = await plob(`${__dirname}/commands/**/*.cmd.ts`); // Get all command files in subfolders.

        // Iterate over all command files, adding them to the collection and array.
        for (const file of commandFiles) {
            const { default: Command } = await import(file);
            const command: Command = new Command();

            this.commands.set(command.data.name, command); // Setting the command in the collection.
            this.commandJSONArray.push(command.data); // Adding `Command.data` to the array.

            print(`/fg_yellow/[🔨]/st_reset/ Loaded /fg_cyan/${command.data.name}.cmd.ts/st_reset/!`);
        }

        // Since this bot belongs to 1 guild.
        const clientId = process.env["CLIENT_ID"] ?? "1234567890";
        const guildId = process.env["GUILD_ID"] ?? "1234567890";

        const rest = new REST({
            version: "9"
        }).setToken(process.env["TOKEN"] ?? "invalid.token.lololol");

        (async () => {
            print(`/fg_yellow/[🧪]/st_reset/ Debug mode: ${this.debug ? "/fg_green/on" : "/fg_red/off"}/st_reset/`);
            print(`/fg_yellow/[🔁]/st_reset/ /st_italic/Refreshing application commands.../st_reset/`);

            try {
                if (this.debug) {
                    await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId), {
                        body: this.commandJSONArray,
                    });

                } else {
                    await rest.put(
                        Routes.applicationCommands(clientId), {
                        body: this.commandJSONArray,
                    });
                }
            } catch (err) {
                print(`/fg_red/[❌]/st_reset/ Failed to refresh application commands!`);
                // @ts-ignore
                print(`/fg_red/[❌]/st_reset/ ${err.message}`);
            }
        })();
    };

    /**
     * Handles events.
     */
    public async handleEvents(): Promise<void> {
        const plob = promisify(glob); // Promisify glob.
        const eventFiles = await plob(`${__dirname}/events/**/*.evt.ts`); // Get all event files.

        // Iterate over all event files.
        for (const file of eventFiles) {
            const { default: Event } = await import(file);
            const event: Event = new Event();

            event.once ? this.once(event.name, async (...args) => await event.execute(this, ...args)
            ) : this.on(event.name, async (...args) => await event.execute(this, ...args));
            print(`/fg_yellow/[🔔]/st_reset/ Loaded /fg_cyan/${event.name}.evt.ts/st_reset/!`);
        }
    };

    /**
     * Handles buttons.
     */
    public async handleButtons(): Promise<void> {
        const plob = promisify(glob);
        const buttonFiles = await plob(`${__dirname}/buttons/**/*.btn.ts`); // Get all button files.

        // Iterate over all button files.
        for (const file of buttonFiles) {
            const { default: Button } = await import(file);
            const button: Button = new Button();

            this.buttons.set(button.customId, button);
            print(`/fg_yellow/[🔵]/st_reset/ Loaded /fg_cyan/${button.customId}.btn.ts/st_reset/!`);
        }
    };

    /**
     * Handles select menus.
     */
    public async handleSelectMenus(): Promise<void> {
        const plob = promisify(glob);
        const selectMenuFiles = await plob(`${__dirname}/select-menus/**/*.mnu.ts`);

        // Iterate over all select menu files.
        for (const file of selectMenuFiles) {
            const { default: SelectMenu } = await import(file);
            const selectMenu: SelectMenu = new SelectMenu();

            this.selectMenus.set(selectMenu.customId, selectMenu);
            print(`/fg_yellow/[🤔]/st_reset/ Loaded /fg_cyan/${selectMenu.customId}.mnu.ts/st_reset/!`);
        }
    };
};
