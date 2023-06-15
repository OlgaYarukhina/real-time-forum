import { navigateTo } from "../index.js";

export const getChat = async (id) => {
  let returnedChat = [];

  let userId = {
    user_id: id.substr(1)
  };

  try {
    const response = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    });

    returnedMessangs = await response.json();

  } catch (err) {
    console.error(err);
  }
  
  console.log(returnedMessangs)
  //return returnedMessangs;
  return null;
}
