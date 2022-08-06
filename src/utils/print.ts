import { TextUtils } from "./textUtils";

export function print(content: any): void {
	if (typeof content === "string") {
		const chars = content.split("");
		let color = "";
		let reading_color = false;

		// Iterate through each character.
		for (let c = 0; c < content.length; c++) {
			if (chars[c] == "/" && chars[c - 1] != "\\") {
				if (!reading_color) reading_color = true;
				else {
					switch (color) {
						// Foreground colors (fg_).
						case "fg_black":
							content = content.replace(`/${color}/`, TextUtils.FG_BLACK);
							break;

						case "fg_red":
							content = content.replace(`/${color}/`, TextUtils.FG_RED);
							break;

						case "fg_green":
							content = content.replace(`/${color}/`, TextUtils.FG_GREEN);
							break;

						case "fg_yellow":
							content = content.replace(`/${color}/`, TextUtils.FG_YELLOW);
							break;

						case "fg_blue":
							content = content.replace(`/${color}/`, TextUtils.FG_BLUE);
							break;

						case "fg_magenta":
							content = content.replace(`/${color}/`, TextUtils.FG_MAGENTA);
							break;

						case "fg_cyan":
							content = content.replace(`/${color}/`, TextUtils.FG_CYAN);
							break;

						case "fg_white":
							content = content.replace(`/${color}/`, TextUtils.FG_WHITE);
							break;

						// Background colors (bg_).
						case "bg_black":
							content = content.replace(`/${color}/`, TextUtils.BG_BLACK);
							break;

						case "bg_red":
							content = content.replace(`/${color}/`, TextUtils.BG_RED);
							break;

						case "bg_green":
							content = content.replace(`/${color}/`, TextUtils.BG_GREEN);
							break;

						case "bg_yellow":
							content = content.replace(`/${color}/`, TextUtils.BG_YELLOW);
							break;

						case "bg_blue":
							content = content.replace(`/${color}/`, TextUtils.BG_BLUE);
							break;

						case "bg_magenta":
							content = content.replace(`/${color}/`, TextUtils.BG_MAGENTA);
							break;

						case "bg_cyan":
							content = content.replace(`/${color}/`, TextUtils.BG_CYAN);
							break;

						case "bg_white":
							content = content.replace(`/${color}/`, TextUtils.BG_WHITE);
							break;

						// Styles (st_).
						case "st_bold":
							content = content.replace(`/${color}/`, TextUtils.ST_BOLD);
							break;

						case "st_dim":
							content = content.replace(`/${color}/`, TextUtils.ST_DIM);
							break;

						case "st_italic":
							content = content.replace(`/${color}/`, TextUtils.ST_ITALIC);
							break;

						case "st_underline":
							content = content.replace(`/${color}/`, TextUtils.ST_UNDERLINE);
							break;

						case "st_blink":
							content = content.replace(`/${color}/`, TextUtils.ST_BLINK);
							break;

						case "st_reverse":
							content = content.replace(`/${color}/`, TextUtils.ST_REVERSE);
							break;

						case "st_hidden":
							content = content.replace(`/${color}/`, TextUtils.ST_HIDDEN);
							break;

						case "st_strike":
							content = content.replace(`/${color}/`, TextUtils.ST_STRIKE);
							break;

						case "st_reset":
							content = content.replace(`/${color}/`, TextUtils.ST_RESET);
							break;

						default:
							print(`Unknown color: '${color}'.`);
					}

					reading_color = false;
					color = "";
				}
			}

			else if (reading_color) {
				const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
				if (validChars.split("").includes(chars[c])) color += chars[c].toLowerCase();
				else print(`Invalid character in color expression: '${chars[c]}'.`);
			}

			else continue;
		}
	}

	typeof content == "string" ? console.log(content.replace("/st_reset/", TextUtils.ST_RESET)) : console.log(content);
};
