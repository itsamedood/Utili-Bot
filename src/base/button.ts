import { ButtonInteraction } from "discord.js";
import { ButtonArgs } from "./data";
import Bot from "../bot";

/**
 * Base class for buttons.
 */
export default abstract class Button {
	private _customId: string;

	constructor(args: ButtonArgs) { this._customId = args.customId; };

	get customId(): string { return this._customId; };

	public abstract execute(interaction: ButtonInteraction, client: Bot): any;
}
