
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
        navigateTo('http://localhost:8080/login', "New user was created. Log in!");
        // errorField.classList.add('active');
        // let mess = `<p style="position: absolute;">Hey <b>${formData.nickname}</b>! Welcome to our forum. Please, login now</p>`;
        // errorField.innerHTML = mess;
      }
  
      if (returnedError.message == "Email already exists") {
        navigateTo('http://localhost:8080/login', "Email already exists.Try to Log in!");
        // errorField.classList.add('active');
        // let mess = `<p style="position: absolute;">Email <b>${formData.email}</b> already exists. Please, try to login</p>`;
        // errorField.innerHTML = mess;
      }
  
      if (returnedError.message == "Nickname already exists") {
        setError(document.getElementById('newNickname'), `Nickname "${formData.nickname}" already exists`);
        check = false;
      }
    } catch (err) {
      console.error(err);
    }
  };