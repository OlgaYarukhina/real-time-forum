import AbstractView from "./AbstractView.js";
import returnedPosts from "../PostsCode.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }


    async getHtml() {

        let postBlocks = `   
        `;
        console.log(returnedPosts)

        for (let i=0; i<returnedPosts.length; i++ ){
            postBlocks  += `
            <div class="wrapper_posts">
                <div class="form-box">
                <h3 class="post_title">${returnedPosts[i].title}</h3>
                <div style="font-size: small;">${returnedPosts[i].create_at}</div>
                <p class="post_content">${returnedPosts[i].content} </p>
                <a class="post_continue" href="/post?id={{.PostID}}">Continue reading</a>    
                </div>
           </div>    
            `
        }

        return postBlocks;
    }

    async getScripts(document) {
        var scripts = [];
        var script1 = document.createElement('script');
        script1.src = '/static/js/PostsCode.js';
        script1.type = 'module';
        scripts.push(script1);
      
        return scripts;
};
 
}
