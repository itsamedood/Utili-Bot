import { CommandInteraction, PermissionsBitField } from "discord.js";
import { CommandArgs, SlashCommandData, Category } from "./data";
import Bot from "../bot";

/**
 * Base class for slash commands.
 */
export default abstract class Command {
	private _data: SlashCommandData;
	private _category: Category;
	private _userPermissions?: bigint[] | undefined;
	private _myPermissions?: bigint[] | undefined;

	constructor(args: CommandArgs) {
		this._data = args.data;
		this._category = args.category;
		this._userPermissions = args.userPermissions;
		this._myPermissions = args.myPermissions;
	};

	get data(): SlashCommandData { return this._data; };
	get category(): Category { return this._category; };
	get userPermissions(): bigint[] | undefined { return this._userPermissions; };
	get myPermissions(): bigint[] | undefined { return this._myPermissions; };

	public abstract execute(interaction: CommandInteraction, client: Bot): any;
};
