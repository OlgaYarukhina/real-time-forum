import AbstractView from "./AbstractView.js";
import { getPost } from "../hooks/PostViewHook.js";
import { addComment } from "../hooks/PostViewHook.js";
import { PostView } from "../components/PostViewComponent.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Viewing Post");
        this.postId = params.id
    }

    async getHtml() {
        return await PostView(getPost, addComment, this.postId);
      }
}
