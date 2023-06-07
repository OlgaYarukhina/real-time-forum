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
    
    console.log(formData.categories)
    
    try {
      console.log(JSON.stringify(formData))
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
      console.log(returnedError);
    
      if (returnedError.message == "Post was created") {
        navigateTo('http://localhost:8080/');
         // errorFild.classList.add('active');
      // let mess = `<p style = "position: absolute;">Post was created!</p>`;
      // errorFild.innerHTML = mess;
      } else {
        // errorFild.classList.add('active');
      // let mess = `<p style = "position: absolute;">Sorry :(. Post was not created. Please, try later </p>`;
      // errorFild.innerHTML = mess;
      }
    
    
    } catch (err) {
      console.error(err);
    }
    }