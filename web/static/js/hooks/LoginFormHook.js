
import { navigateTo } from "../index.js";

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
  };
  
 export const login = async () => {
    let formData = {
      email: document.getElementById("email").value,
      pass: document.getElementById("password").value,
    };
  
    try {
      console.log(JSON.stringify(formData));
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });
      const returnedError = await response.json();
      console.log(returnedError);
  
      if (returnedError.message === "Email not found") {
        setError(email, "Sorry, but we cannot find the email " + formData.email + ". Please try again.");
      } else if (returnedError.message === "Wrong password") {
        setError(password, "Unfortunately, the password is wrong.");
      } else if (returnedError.message === "Successfully logged in") {
        //nav.classList.add("active");
        localStorage.setItem("sessionToken", returnedError.token);
        localStorage.setItem("sessionId", returnedError.session_id);
        localStorage.setItem("userId", returnedError.user_id);
        navigateTo("http://localhost:8080/");
      } else {
        // Handle other cases if needed
      }
    } catch (err) {
      console.error(err);
    }
  };
  