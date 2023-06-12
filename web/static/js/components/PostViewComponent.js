export async function PostView (callback, callback1, id) {

    let returnedPost = await callback(id);
        
    // div for post+comments
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper_post_comments');

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

    // div add comment

    const wrapperAddComment = document.createElement('div');
    wrapperAddComment.classList.add('wrapper_add_comment');

    const form = document.createElement('form');
    form.id = 'add_comment';
  
    const textarea = document.createElement('textarea');
    textarea.classList.add('input-box_textarea');
    textarea.id = 'addComment';
    textarea.name = 'addComment';
    textarea.placeholder = 'Add comment';
    textarea.rows = '4';
    textarea.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('btn');
    submitButton.classList.add('btn-narrow');
    submitButton.textContent = 'Comment';

    form.appendChild(textarea);
    form.appendChild(submitButton);
      
    wrapperAddComment.appendChild(form);

    form.addEventListener('submit', e => {
      e.preventDefault();
        callback1(id);
      })
  
    wrapper.appendChild(wrapperAddComment);

     // div for comments

     if (returnedPost.comments != null) {
      for (let i = 0; i < returnedPost.comments.length; i++) {
        const wrapperComment = document.createElement('div');
        wrapperComment.classList.add('wrapper_comments');
      
        const nickname = document.createElement('h4');
        nickname.textContent = returnedPost.comments[i].nickname;
      
        const createdAt = document.createElement('div');
        createdAt.classList.add('created_at');
        createdAt.textContent = returnedPost.comments[i].created_at;
      
        const comment = document.createElement('p');
        comment.classList.add('post_content');
        comment.textContent = returnedPost.comments[i].comment;
      
      
        wrapperComment.appendChild(nickname);
        wrapperComment.appendChild(createdAt);
        wrapperComment.appendChild(comment);
      
        wrapper.appendChild(wrapperComment);
      }
     }


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