export async function PostView (callback) {

    let returnedPost = await callback();
        
    // div for post+comments
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper_post&comments');

     // div for post
    const wrapperPost = document.createElement('div');
    wrapperPost.classList.add('wrapper_post');
  
    const title = document.createElement('h3');
    title.textContent = returnedPost.post.title;
  
    const createdAt = document.createElement('div');
    createdAt.classList.add('created_at');
    createdAt.textContent = returnedPost.post.created_at;
  
    const content = document.createElement('p');
    content.classList.add('post_content');
    content.textContent = returnedPost.post.content;
  
  
    wrapperPost.appendChild(title);
    wrapperPost.appendChild(createdAt);
    wrapperPost.appendChild(content);
  
    wrapper.appendChild(wrapperPost);


     // div for comments

    return wrapper;
  }







    // let postBlocks = `
    // <div class="wrapper_view_post"> 
    // <div class="view_post">
    //     <h3>${this.title}</h3>
    //      <div class="created_at">${this.created_at}</div>
    //     <p class="post_content">${this.content} </p>
    // </div>  
    // </div>  
    //     `;

    //   //  content.innerHTML = "post"

    //     postBlocks += `
    //     <div class="post_coments">
    //         <h4>Nickname</h4>
    //         <p class="post_content">coment coment coment coment coment coment coment coment coment coment coment coment coment coment comentcoment coment coment coment coment coment coment coment coment coment</p>
    //     </div>    
    //         `;
           
    // return postBlocks