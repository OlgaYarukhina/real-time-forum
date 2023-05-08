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
    newNickname:   document.getElementById('newNickname').value,
    age:           document.getElementById('age').value,
    gender:        document.getElementById('gender').value,
    lastName:      document.getElementById('lastName').value,
    newEmail:      document.getElementById('newEmail').value,
    newPassword:   document.getElementById('newPassword').value,
  }

  console.log(formData)

 await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  console.log("Here3")
}