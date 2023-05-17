import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register page");
    }

    async getHtml() {
        console.log("new http get chats request (expect list of users, sorted by last msg sended, who is online, others alphabet)")
        return `
            <h2>login - ...</h2>
            <h2>age - ...</h2>
            <h2>first name - ...</h2>
            <h2>second name - ...</h2>
            <h2>... - ...</h2>
            <h2>pass - ...</h2>
            <h2>register</h2>
        `;
    }
}