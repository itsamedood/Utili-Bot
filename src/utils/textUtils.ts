export class TextUtils {
	public static base = "\x1b[";

	// FG colors.
	public static FG_BLACK = `${TextUtils.base}30m`;
	public static FG_RED = `${TextUtils.base}31m`;
	public static FG_GREEN = `${TextUtils.base}32m`;
	public static FG_YELLOW = `${TextUtils.base}33m`;
	public static FG_BLUE = `${TextUtils.base}34m`;
	public static FG_MAGENTA = `${TextUtils.base}35m`;
	public static FG_CYAN = `${TextUtils.base}36m`;
	public static FG_WHITE = `${TextUtils.base}37m`;

	//BG colors.
	public static BG_BLACK = `${TextUtils.base}40m`;
	public static BG_RED = `${TextUtils.base}41m`;
	public static BG_GREEN = `${TextUtils.base}42m`;
	public static BG_YELLOW = `${TextUtils.base}43m`;
	public static BG_BLUE = `${TextUtils.base}44m`;
	public static BG_MAGENTA = `${TextUtils.base}45m`;
	public static BG_CYAN = `${TextUtils.base}46m`;
	public static BG_WHITE = `${TextUtils.base}47m`;

	// Styles.
	public static ST_BOLD = `${TextUtils.base}1m`;
	public static ST_DIM = `${TextUtils.base}2m`;
	public static ST_ITALIC = `${TextUtils.base}3m`;
	public static ST_UNDERLINE = `${TextUtils.base}4m`;
	public static ST_BLINK = `${TextUtils.base}5m`;
	public static ST_REVERSE = `${TextUtils.base}7m`;
	public static ST_HIDDEN = `${TextUtils.base}8m`;
	public static ST_STRIKE = `${TextUtils.base}9m`;
	public static ST_RESET = `${TextUtils.base}0m`;
};
