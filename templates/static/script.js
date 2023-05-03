const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registrLink = document.querySelector('.regist-link')

registrLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});