export async function CreatePostsBlocks(callback){
  
  let returnedPosts = await callback()

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper_all_posts');

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



 