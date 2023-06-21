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
  
    let categories =[];
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
      if(item.checked === true){
        categories.push(item.value)
      }
    });

    if (categories.length == 0) {
      setError(categories, "Choose at list one category");
      check = false;
    } else {
      setSuccess(categories);
    }
    
    return check;
  };