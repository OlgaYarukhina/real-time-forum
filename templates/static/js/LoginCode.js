import { navigateTo } from "./index.js";

const form = document.getElementById('form-login');

form.addEventListener('submit', e => {
  console.log("DA")
  e.preventDefault();
  login();
})

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
}

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

    if (returnedError.message == "Email not found") {
      setError(email, "Sorry, but we can not find email " + formData.email + ". Please try again");
    } else if (returnedError.message == "Wrong password") {
      setError(password, "Unfortunately password is wrong");
    } else if (returnedError.message == "Successfully logined") {
      navigateTo('http://localhost:8080/');
    } else {
      // errorFild.classList.add('active');
      // let mess = `<p style = "position: absolute;">Internal login error. Please, try again</p>`;
      // errorFild.innerHTML = mess;
    }


  } catch (err) {
    console.error(err);
  }
}
