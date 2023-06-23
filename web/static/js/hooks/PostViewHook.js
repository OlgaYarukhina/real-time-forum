import { navigateTo } from "../index.js";

export const getPost = async (id) => {
  let returnedPost = [];

  let postId = {
    post_id: id.substr(1)
  };

  try {
    const response = await fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    });

    if (response.status === 401) {
      navigateTo("http://localhost:8080/login");
      return [];
    }

    returnedPost = await response.json();

  } catch (err) {
    console.error(err);
  }
  
  return returnedPost;
}

export const addComment = async (id) => {
  let formData = {
    comment: document.getElementById('addComment').value,
    post_id: id.substr(1)
  }
    
    const response = await fetch('http://localhost:8080/api/create_comment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Token': localStorage.getItem("sessionToken"),
        'X-Session-Id': localStorage.getItem("sessionId")
      },
      body: JSON.stringify(formData)
    });
    const returnedError = await response.json();

    try {
      if (response.status === 401) {
        navigateTo("http://localhost:8080/login");
      }

    if (returnedError.message == "Comment was created") {
      navigateTo('http://localhost:8080/login', "Email already exists.Try to Log in!");
    } else {

    }
  } catch (err) {
    console.error(err);
  }
}