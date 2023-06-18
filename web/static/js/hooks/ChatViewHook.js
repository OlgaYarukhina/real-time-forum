import { navigateTo, changeChatRoom } from "../index.js";

export const getChat = async (id) => {

  changeChatRoom(id.substr(1))
  let returnedMessage = [];

  let requestData = {
    user_id: parseInt(id.substr(1))
  };

  try {
    const response = await fetch("http://localhost:8080/api/get_chat", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
        'X-Session-Token' : localStorage.getItem("sessionToken"),
        'X-Session-Id' : localStorage.getItem("sessionId")
      },
      body: JSON.stringify(requestData),
      //body: JSON.stringify(parseInt(id.substr(1), 10))
    });

    returnedMessage = await response.json();

  } catch (err) {
    console.error(err);
  }
  
  console.log(returnedMessage)
  return returnedMessage;
}

export const createMessage = async (id) => {
  console.log("sending message!")
  console.log(id)
  let formData = {
    body: document.getElementById('writeMessage').value,
    receiver_id: id.substr(1)
  }

  try {
    console.log(JSON.stringify(formData))
    const response = await fetch('http://localhost:8080/api/create_message', {
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