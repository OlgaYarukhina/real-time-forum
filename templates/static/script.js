const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registrLink = document.querySelector('.regist-link');

registrLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

console.log("Here1")

const register = () => {
    console.log("Here2")
    const formData = new FormData();
    const arrayOfRegisterId = ['newNickname', 'age', 'gender', 'lastName', 'newEmail', 'newPassword'];

    for (let i = 0; i < 6; i++) {
        formData.append(arrayOfRegisterId[i], document.getElementById(arrayOfRegisterId[i]))
    }
   
    fetch('/register', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log('Fetch Error', err);
        });
       

        console.log(formData)
    console.log("Here3")
}