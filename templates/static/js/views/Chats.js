import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Chats");
    }

    async getHtml() {
        console.log("new http get chats request (expect list of users, sorted by last msg sended, who is online, others alphabet)")
        return `
            <h1>Chats</h1>
            <p>You are viewing the chats!</p>
        `;
    }
}