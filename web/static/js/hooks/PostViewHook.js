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
  
  console.log(returnedPost)
  return returnedPost;
}

export const addComment = async (id) => {

  let formData = {
    comment: document.getElementById('addComment').value,
    post_id: id.substr(1)
  }

  try {
    console.log(JSON.stringify(formData))
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
    console.log(returnedError);

    if (returnedError.message == "Post was created") {
      //navigateTo('http://localhost:8080/');
      console.log("Comment was created")

    } else {

    }


  } catch (err) {
    console.error(err);
  }
}