import { EventArgs } from "./data";
import Bot from "../bot";

/**
 * Base class for client events.
 */
export default abstract class Event {
	private _name: string;
	private _once: boolean;

	constructor(args: EventArgs) {
		this._name = args.name;
		this._once = args.once ?? false;
	};

	get name(): string { return this._name; };
	get once(): boolean { return this._once; };

	public abstract execute(client: Bot, ...args: any[]): any;
};
