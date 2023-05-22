import { navigateTo } from "./index.js";

const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  login();
})

const login = async () => {
  console.log("Try to loging")
  let formData = {
    email: document.getElementById('email').value,
    pass: document.getElementById('password').value,
  }

  try {
    console.log(JSON.stringify(formData))
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const returnedError = await response.json();
    console.log(returnedError);

    if (returnedError.message == "Wrong email") {
      setError(email, "Sorry, but we can not find email " + formData.email + ". Please try again");
    }

    if (returnedError.message == "Wrong password") {
      setError(password, "Unfortunately password is wrong");
    }

  } catch (err) {
    console.error(err);
  }
}
