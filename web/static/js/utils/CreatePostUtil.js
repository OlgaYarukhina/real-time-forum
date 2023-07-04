export const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
  };
  
export const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = "";
    inputControl.classList.remove('error');
  };
  
  
export const validateInputs = () => {
    let check = false;

    const categories = document.getElementById('create_post');
    let categoriesArr =[];
    // document.querySelectorAll('[type="checkbox"]').forEach(item => {
    //   if(item.checked === true){
    //     categoriesArr.push(item.value)
    //   }
    // });


    // if (categoriesArr.length === 0) {
    //   setError(categories, "Choose at least one category");
    // } else {
    //   setSuccess(categories);
    //   check = true;
    // }
    setSuccess(categories);
    console.log(check)
    return true;
  };