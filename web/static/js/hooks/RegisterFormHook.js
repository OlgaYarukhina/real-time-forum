
import { navigateTo } from "../index.js";

export const register = async () => {
    let formData = {
      nickname: document.getElementById('newNickname').value,
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      email: document.getElementById('newEmail').value,
      pass: document.getElementById('newPassword').value,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const returnedError = await response.json();
  
      if (returnedError.message == "New user was created") {
        navigateTo('http://localhost:8080/login', `New user "<b> ${formData.nickname} </b>" with email "<b>${formData.email}</b>" was created. Log in!`)
      }
  
      if (returnedError.message == "Email already exist") {
        navigateTo('http://localhost:8080/login', `Email "<b> ${formData.email} </b>" already exists.Try to Log in!`);
      }
  
      if (returnedError.message == "Nickname already exist") {
        setError(document.getElementById('newNickname'), `Nickname "<b>${formData.nickname}</b>" already exists`);
        check = false;
      }
    } catch (err) {
      console.error(err);
    }
  };