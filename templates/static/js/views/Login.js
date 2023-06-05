import AbstractView from "./AbstractView.js";
import { CreateLoginForm } from "./LoginFormComponent.js";
import { login } from "./LoginFormHook.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Log in page");
    }

    //rename to get() ?
    async getHtml() {
        return CreateLoginForm(login);
    }
}