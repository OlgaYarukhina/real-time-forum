import { navigateTo } from "../index.js";


export const createPost = async () => {
    let categories =[];
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
      if(item.checked === true){
        categories.push(item.value)
      }
    });

    let formData = {
      title: document.getElementById('postTitle').value,
      content: document.getElementById('postContent').value,
      categories: categories,
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/create_post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Session-Token' : localStorage.getItem("sessionToken"),
          'X-Session-Id' : localStorage.getItem("sessionId")
        },
        body: JSON.stringify(formData)
      });
      const returnedError = await response.json();

      if (response.status === 401) {
        navigateTo("http://localhost:8080/login");
      }
    
      if (returnedError.message == "Post was created") {
        navigateTo('http://localhost:8080/', 'Post was created');
      } else {
        navigateTo('http://localhost:8080/', 'Something wrong. Post was not created. Ask developers :)');
      }
    
    
    } catch (err) {
      console.error(err);
    }
    }