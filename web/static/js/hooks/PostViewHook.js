import { navigateTo } from "../index.js";

export const getPost = async () => {
    let returnedPost = [];
  
    try {
        const response = await fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
          });
  
      returnedPost = await response.json();
  
    } catch (err) {
      console.error(err);
    }
    return returnedPost;
  }