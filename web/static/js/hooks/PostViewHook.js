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
  
      returnedPost = await response.json();
  
    } catch (err) {
      console.error(err);
    }
    return returnedPost;
  }