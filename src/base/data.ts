/* TYPES */
export declare type Category = "DEV_ONLY" | "FUN" | "IMPORTANT" | "MISC" | "MODERATION";

/* ENUMS */

/**
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
 */
export enum OptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
	MENTIONABLE = 9,
	NUMBER = 10,
	ATTACHMENT = 11
};

/* INTERFACES */

// COMMAND //

/**
 * Data for choices in options.
 */
export interface ChoiceData {
	name: string;
	value: string;
};

/**
 * Data for options for commands.
 */
export interface OptionData {
	name: string;
	description: string;
	type: OptionType;
	required?: boolean | undefined;
	choices?: ChoiceData[] | undefined;
};

/**
 * Replacement for the `SlashCommandBuilder` class.
 */
export interface SlashCommandData {
	name: string;
	description: string;
	options?: OptionData[] | undefined;
};

/**
 * Arguments for base class `Command`.
 */
export interface CommandArgs {
	data: SlashCommandData;
	category: Category;
	userPermissions?: bigint[] | undefined;
	myPermissions?: bigint[] | undefined;
};

// EVENT //

/**
 * Arguments for base class `Event`.
 */
export interface EventArgs {
	name: string;
	once?: boolean | undefined;
};

// BUTTON //

/**
 * Arguments for base class `Button`.
 */
export interface ButtonArgs {
	customId: string;
};

// SELECT MENU //

/**
 * Arguments for base class `SelectMenu`.
 */
export interface SelectMenuArgs {
	customId: string;
};
