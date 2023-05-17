import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New post creation page");
    }

    async getHtml() {
        return `
            <h2>login - ...</h2>
            <h2>pass - ...</h2>
            <h2>log in</h2>
        `;
    }
}