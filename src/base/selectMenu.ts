import { SelectMenuInteraction } from "discord.js";
import { SelectMenuArgs } from "./data";
import Bot from "../bot";

/**
 * Base class for select menus.
 */
export default abstract class SelectMenu {
	private _customId: string;

	constructor(args: SelectMenuArgs) { this._customId = args.customId; };

	get customId(): string { return this._customId; };

	public abstract execute(interaction: SelectMenuInteraction, client: Bot): any;
};
