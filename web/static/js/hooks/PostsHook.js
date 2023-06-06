import { navigateTo } from "../index.js";


export const getAllPosts = async () => {
  let returnedPosts = [];

  console.log("Try get all posts")

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