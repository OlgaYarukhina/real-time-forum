import AbstractView from "./AbstractView.js";
import { CreatePostForm } from "../components/PostFormComponent.js";
import { createPost } from "../hooks/PostFormHook.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New post creation page");
    }

    async getHtml() {
      return await CreatePostForm(createPost);
    }
}
