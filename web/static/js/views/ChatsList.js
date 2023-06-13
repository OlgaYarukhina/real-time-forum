import AbstractView from "./AbstractView.js";
import { CreateChatsList } from "../components/ChatsListComponent.js";
import { getAllUsers } from "../hooks/ChatsListHook.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Chats List");
    }

    async getHtml() {
      return await CreateChatsList(getAllUsers);
    }
}