import { navigateTo, changeChatRoom } from "../index.js";

export const getChat = async (id, firstHistoryMsg = "", historyPage = 0) => {

  changeChatRoom(id.substr(1))
  let returnedMessage = [];

  let requestData = {
    user_id: parseInt(id.substr(1)),
    history_page: parseInt(historyPage),
    first_history_msg: firstHistoryMsg
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

    if (response.status === 401) {
      navigateTo("http://localhost:8080/login");
      return [];
    }

    returnedMessage = await response.json();

  } catch (err) {
    console.error(err);
  }
  
  return returnedMessage;
}

export const createMessage = async (id) => {
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

    if (response.status === 401) {
      navigateTo("http://localhost:8080/login");
    }
  
 
  } catch (err) {
    console.error(err);
  }
}