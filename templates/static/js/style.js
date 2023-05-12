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
            select = this.closest('.select'),
            currentValue = this.closest('.select').querySelector('.select_current');
       currentValue.innerText = value;
       select.classList.remove('is-active');

    }
};

select();