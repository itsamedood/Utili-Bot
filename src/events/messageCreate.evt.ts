import { Message } from "discord.js";
import Event from "../base/event";
import Bot from "../bot";

export default class MessageCreate extends Event {
	constructor() { super({ name: "messageCreate" }); };

	async execute(client: Bot, message: Message) { };
};
