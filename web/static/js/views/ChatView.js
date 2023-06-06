import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.chatId = params.id;
        this.setTitle("Viewing chat");
    }

    async getHtml() {
        return `
            <h1>Chat</h1>
            <p>You are viewing chat #${this.chatId}.</p>
        `;
    }
}