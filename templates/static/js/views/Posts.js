import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        console.log("new http get posts request")
        return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
    }
}