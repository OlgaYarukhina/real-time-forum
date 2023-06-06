import { navigateTo } from "./index.js";

let returnedPosts = [];

const getAllPosts = async () => {
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
}


await getAllPosts(); 

export default returnedPosts;