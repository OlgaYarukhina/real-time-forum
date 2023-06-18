import AbstractView from "./AbstractView.js";
import { getChat } from "../hooks/ChatViewHook.js";
import { createMessage } from "../hooks/ChatViewHook.js";
import { CreateChatBlocks } from "../components/ChatViewComponent.js";
import { sendMessage } from "../index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Viewing Chat");
        this.userId = params.id
    }

    async getHtml() {
        return await CreateChatBlocks(getChat, sendMessage, this.userId);
      }
}
