import { navigateTo } from "../index.js";

export const getAllPosts = async () => {
  let returnedPosts = [];

  console.log("Try to get all posts");
  console.log("session - " + localStorage.getItem("sessionToken"));
  console.log("user_id - " + localStorage.getItem("sessionId"));

  try {
    const response = await fetch('http://localhost:8080/api/posts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Token': localStorage.getItem("sessionToken"),
        'X-Session-Id': localStorage.getItem("sessionId")
      },
    });

    if (response.status === 401) {
      navigateTo("http://localhost:8080/login");
      return [];
    }

    returnedPosts = await response.json();
  } catch (err) {
    console.error(err);
  }

  return returnedPosts;
};
