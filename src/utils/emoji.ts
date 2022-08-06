import Bot from "../bot";

/**
 * Emojis specifically for Utili-Bot.
 */
export enum UtiliMoji {
	YES = "841079064931598336",
	NO = "841079108917133342",
	ERROR = "833203012918312990",
	OPTION = "833893729210990613"
}

/**
 * Get an emoji from cache via ID.
 * @returns The emoji or '❓'.
 */
export function getEmoji(client: Bot, id: string): string | "❓" {
	return client.emojis.cache.get(id)?.toString() ?? "❓"; // '❓' is the placeholder if an emoji does not exist.
};
