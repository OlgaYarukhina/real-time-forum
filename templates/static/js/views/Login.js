import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Log in page");
    }

    async getHtml() {
        console.log("new http get chats request (expect list of users, sorted by last msg sended, who is online, others alphabet)")
        return `
            <h2>login - ...</h2>
            <h2>pass - ...</h2>
            <h2>log in</h2>
        `;
    }
}