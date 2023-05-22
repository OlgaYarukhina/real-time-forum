const wrapper = document.querySelector('.wrapper');


let select = function () {
    let selectHeader = document.querySelectorAll('.select_header');
    let selectItem = document.querySelectorAll('.select_item');

    selectHeader.forEach(item => {
        item.addEventListener('click', seletToggle)
        });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    })

    function seletToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose(){
        let value = this.innerText,
            select = this.closest('.select');
        document.getElementById('gender').value = value;
       select.classList.remove('is-active');
    }
};

select();


// const loginLink = document.querySelector('.login-link');
// const registrLink = document.querySelector('.regist-link');
// registrLink.addEventListener('click', () => {
//     wrapper.classList.add('active');
//     errorFild.classList.remove('active');
//   });
  
//   loginLink.addEventListener('click', () => {
//     wrapper.classList.remove('active');
//   });
  