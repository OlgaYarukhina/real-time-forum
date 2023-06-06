import AbstractView from "./AbstractView.js";
import { getPost  } from "../hooks/PostViewHook.js";
import { PostView } from "../components/PostViewComponent.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        return await PostView(getPost);
      }
}
