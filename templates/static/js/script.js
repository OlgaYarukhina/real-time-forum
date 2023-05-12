const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registrLink = document.querySelector('.regist-link');

registrLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});


const register = async () => {

  const formData = {
    nickname:   document.getElementById('newNickname').value,
    age:           document.getElementById('age').value,
    gender:        document.getElementById('gender').value,
    first_name:      document.getElementById('firstName').value,
    last_name:      document.getElementById('lastName').value,
    email:      document.getElementById('newEmail').value,
    pass:   document.getElementById('newPassword').value,
  }

  try {
    console.log("JSON.stringify(formData)")
    console.log(JSON.stringify(formData))
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }


//  await fetch('http://localhost:8080/register', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(formData)
//   }).then(response => response.json())

}