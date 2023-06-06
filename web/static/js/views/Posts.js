import AbstractView from "./AbstractView.js";
import { CreatePostsBlocks } from "../components/PostsComponent.js";
import { getAllPosts } from "../hooks/PostsHook.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
      return await CreatePostsBlocks(getAllPosts);
    }
}