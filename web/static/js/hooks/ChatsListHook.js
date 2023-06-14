import { navigateTo } from "../index.js";

export const getAllUsers = async () => {
    let returnedUsers = [];
  
    console.log("Try to get all users");
  
    try {
      const response = await fetch('http://localhost:8080/api/get_users', {
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
  
      returnedUsers = await response.json();
    } catch (err) {
      console.error(err);
    }
  console.log(returnedUsers)
    return returnedUsers;
  };