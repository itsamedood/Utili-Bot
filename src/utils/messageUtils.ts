/**
 * Useful functions for messages.
 */
export default class MessageUtils {
	public static toCodeBlock = (content: string, lang: string): string => { return `\`\`\`${lang}\n${content}\n\`\`\`` };
}
