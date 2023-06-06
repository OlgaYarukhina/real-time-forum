import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }


    async getHtml() {

       let returnedPosts = await this.getAllPosts();

        console.log(returnedPosts)

        const wrapper = document.createElement('div');

        for (let i = 0; i < returnedPosts.length; i++) {
          const wrapperPosts = document.createElement('div');
          wrapperPosts.classList.add('wrapper_posts');
        
          const title = document.createElement('h3');
          title.textContent = returnedPosts[i].title;
        
          const createdAt = document.createElement('div');
          createdAt.classList.add('created_at');
          createdAt.textContent = returnedPosts[i].created_at;
        
          const content = document.createElement('p');
          content.classList.add('post_content');
          content.textContent = returnedPosts[i].content;
        
          const link = document.createElement('a');
          link.classList.add('post_continue');
          link.href = `/view_post:${returnedPosts[i].post_id}`;
          link.setAttribute('data-link', '');
          link.textContent = 'Full post & comments';
        
          wrapperPosts.appendChild(title);
          wrapperPosts.appendChild(createdAt);
          wrapperPosts.appendChild(content);
          wrapperPosts.appendChild(link);
        
          wrapper.appendChild(wrapperPosts);
        }

        return wrapper;
    }

    async getAllPosts(){
        let returnedPosts = [];
      console.log("Try get all posts")
      let postsData = { 
      }
    
      try {
        const response = await fetch('http://localhost:8080/api/posts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
    
        returnedPosts = await response.json();
    
      } catch (err) {
        console.error(err);
      }
      return returnedPosts;
    }

//     async getScripts(document) {
//         var scripts = [];
//         var script1 = document.createElement('script');
//         script1.src = '/static/js/PostsCode.js';
//         script1.type = 'module';
//         scripts.push(script1);
//         return scripts;
// };
 
}
