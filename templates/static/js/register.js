const form = document.getElementById('form');
const userNickname = document.getElementById('newNickname');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const newEmail = document.getElementById('newEmail');
const newPassword = document.getElementById('newPassword');


form.addEventListener('submit', e => {
  e.preventDefault();

  if (validateInputs()) {
    console.log('Well done')
    register();
  }
})

const isValidNickname = userNickname => {
  const rex = /^[a-zA-Z0-9_]{4,10}$/;
  return rex.test(String(userNickname));
}

const isValidName = name => {
  const rex = /^[a-zA-Z]{4,20}$/;
  return rex.test(String(name));
}


const isValidEmail = newEmail => {
  const rex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return rex.test(String(newEmail.toLowerCase()));
}

//rxPassword  = regexp.MustCompile(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$`)

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = "";
  inputControl.classList.remove('error');
}

const validateInputs = () => {
  let check = true;

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
    setError(newPassword, "Password must be at least 8 character");
    check = false;
  } else {
    setSuccess(newPassword);
  }

  return check;
}


const register = async () => {

  let formData = {
    nickname: userNickname.value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    first_name: firstName.value,
    last_name: lastName.value,
    email: newEmail.value,
    pass: newPassword.value,
  }

  try {
    console.log(JSON.stringify(formData))
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const returnedError = await response.json();
    console.log(returnedError);

    if (returnedError.message == "Email already exist") {
      wrapper.classList.remove('active');
      errorFild.classList.add('active');
      
      let mess = `<p style = "position: absolute; top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%);">Email <b>${formData.email}</b> already exist. Please, try to login</p>`;
      errorFild.innerHTML = mess;
    }

    if (returnedError.message == "Nickname already exist") {
      setError(userNickname, "Nickname " + formData.nickname + " already exist");
      check = false;
    }

  } catch (err) {
    console.error(err);
  }
}


