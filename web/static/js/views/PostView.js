import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        
        // const postBlocks = `<div class="wrapper_view_post"> e5hq45</div>`;
        // const content = document.querySelector('.wrapper_view_post');

        let postBlocks = `
        <div class="wrapper_view_post"> 
        <div class="view_post">
            <h3>${this.title}</h3>
             <div class="created_at">${this.created_at}</div>
            <p class="post_content">${this.content} </p>
        </div>  
        </div>  
            `;

          //  content.innerHTML = "post"

            postBlocks += `
            <div class="post_coments">
                <h4>Nickname</h4>
                <p class="post_content">coment coment coment coment coment coment coment coment coment coment coment coment coment coment comentcoment coment coment coment coment coment coment coment coment coment</p>
            </div>    
                `;


                // postBlocks += `
                // <div class="post_coments">
                //     <h3>Nickname</h3>
                //     <p class="post_content">coment coment coment coment coment coment coment coment coment coment coment coment coment coment comentcoment coment coment coment coment coment coment coment coment coment</p>
                // </div>    
                //     `;
                //     postBlocks += `
                //     <div class="post_coments">
                //         <h3>Nickname</h3>
                //         <p class="post_content">coment coment coment coment coment coment coment coment coment coment coment coment coment coment comentcoment coment coment coment coment coment coment coment coment coment</p>
                //     </div>    
                //         `;
                //         postBlocks += `
                //         <div class="post_coments">
                //             <h3>Nickname</h3>
                //             <p class="post_content">coment coment coment coment coment coment coment coment coment coment coment coment coment coment comentcoment coment coment coment coment coment coment coment coment coment</p>
                //         </div>    
                            // `;
               

        return postBlocks
    }

}