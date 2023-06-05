import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }


    async getHtml() {

        let postBlocks = ``;
        console.log(returnedPosts)

        for (let i=0; i<returnedPosts.length; i++ ){
            postBlocks  += `
            <div class="wrapper_posts">
                <h3>${returnedPosts[i].title}</h3>
                <div class="created_at">${returnedPosts[i].created_at}</div>
                <p class="post_content">${returnedPosts[i].content} </p>
                <a class="post_continue" href="/view_post:${returnedPosts[i].post_id}" data-link>Full post & coments</a>    
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
