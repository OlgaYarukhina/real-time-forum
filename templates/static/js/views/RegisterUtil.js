
const isValidNickname = userNickname => {
    const rex = /^[a-zA-Z0-9_]{4,10}$/;
    return rex.test(String(userNickname));
  };
  
  const isValidName = name => {
    const rex = /^[a-zA-Z]{4,20}$/;
    return rex.test(String(name));
  };
  
  const isValidEmail = newEmail => {
    const rex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return rex.test(String(newEmail.toLowerCase()));
  };
  
  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
  };
  
  const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = "";
    inputControl.classList.remove('error');
  };
  
export const validateInputs = () => {
    let check = true;
  
    const userNickname = document.getElementById('newNickname');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const newEmail = document.getElementById('newEmail');
    const newPassword = document.getElementById('newPassword');
  
    const userNicknameValue = userNickname.value.trim();
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = newEmail.value.trim();
    const passwordValue = newPassword.value.trim();
  
    if (!isValidNickname(userNicknameValue)) {
      setError(userNickname, "Nickname must be alphanumeric and between 4-10 characters");
      check = false;
    } else {
      setSuccess(userNickname);
    }
  
    if (!isValidName(firstNameValue)) {
      setError(firstName, "Firstname must contain only letters and be between 4-20 characters");
      check = false;
    } else {
      setSuccess(firstName);
    }
  
    if (!isValidName(lastNameValue)) {
      setError(lastName, "Lastname must contain only letters and be between 4-20 characters");
      check = false;
    } else {
      setSuccess(lastName);
    }
  
    if (!isValidEmail(emailValue)) {
      setError(newEmail, "Email is invalid");
      check = false;
    } else {
      setSuccess(newEmail);
    }
  
    if (passwordValue.length < 8) {
      setError(newPassword, "Password must be at least 8 characters");
      check = false;
    } else {
      setSuccess(newPassword);
    }
  
    return check;
  };