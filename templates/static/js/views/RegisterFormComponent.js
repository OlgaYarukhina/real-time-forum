export function CreateRegisterForm(callback){
    const wrapperRegister = document.createElement("div");
    wrapperRegister.className = "wrapper_register";
    
    // Create the form-box registration div
    const formBox = document.createElement("div");
    formBox.className = "form-box registration";
    
    // Create the h3 element for Create new account
    const registerHeading = document.createElement("h3");
    registerHeading.textContent = "Create new account";
    
    // Create the form element
    const form = document.createElement("form");
    form.id = "form";
    
    // Create the nickname input box
    const nicknameInputBox = createInputBox("newNickname", "Nickname", "person-add-outline");
    
    // Create the age input box
    const ageInputBox = createInputBox("age", "Age", "infinite-outline");
    ageInputBox.querySelector("input").type = "number";
    ageInputBox.querySelector("input").min = "10";
    ageInputBox.querySelector("input").max = "100";
    
    // Create the gender select box
    const genderSelect = document.createElement("div");
    genderSelect.className = "select";
    
    const selectHeader = document.createElement("div");
    selectHeader.className = "input-box select_header";
    
    const selectIcon = document.createElement("span");
    selectIcon.className = "icon";
    const selectIconIon = document.createElement("ion-icon");
    selectIconIon.name = "transgender-outline";
    selectIcon.appendChild(selectIconIon);
    selectHeader.appendChild(selectIcon);
    
    const selectInput = document.createElement("input");
    selectInput.type = "text";
    selectInput.id = "gender";
    selectInput.className = "gender";
    selectInput.name = "gender";
    selectInput.required = true;
    selectHeader.appendChild(selectInput);
    
    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = "gender";
    selectLabel.textContent = "Gender";
    selectHeader.appendChild(selectLabel);
    
    const selectBody = document.createElement("div");
    selectBody.className = "select_body";
    
    const selectItem1 = document.createElement("div");
    selectItem1.className = "select_item";
    selectItem1.textContent = "F";
    const selectItem2 = document.createElement("div");
    selectItem2.className = "select_item";
    selectItem2.textContent = "M";
    const selectItem3 = document.createElement("div");
    selectItem3.className = "select_item";
    selectItem3.textContent = "O";
    
    selectBody.appendChild(selectItem1);
    selectBody.appendChild(selectItem2);
    selectBody.appendChild(selectItem3);
    
    genderSelect.appendChild(selectHeader);
    genderSelect.appendChild(selectBody);
    
    // Create the firstName input box
    const firstNameInputBox = createInputBox("firstName", "First Name", "person-outline");
    
    // Create the lastName input box
    const lastNameInputBox = createInputBox("lastName", "Last Name", "people-outline");
    
    // Create the newEmail input box
    const newEmailInputBox = createInputBox("newEmail", "Email", "at-outline");
    
    // Create the newPassword input box
    const newPasswordInputBox = createInputBox("newPassword", "Password", "lock-closed-outline");
    
    // Create the create account button
    const createAccountButton = document.createElement("button");
    createAccountButton.type = "submit";
    createAccountButton.className = "btn";
    createAccountButton.textContent = "Create account";
    
    // Create the login-regist div
    const loginRegistDiv = document.createElement("div");
    loginRegistDiv.className = "login-regist";
    
    // Create the paragraph element
    const loginRegistParagraph = document.createElement("p");
    loginRegistParagraph.textContent = "Already have an account?";
    
    // Create the anchor element
    const loginLink = document.createElement("a");
    loginLink.href = "/login";
    loginLink.dataset.link = "";
    loginLink.textContent = "login";
    
    // Append elements to the appropriate parent elements
    loginRegistParagraph.appendChild(loginLink);
    loginRegistDiv.appendChild(loginRegistParagraph);
    form.appendChild(nicknameInputBox);
    form.appendChild(ageInputBox);
    form.appendChild(genderSelect);
    form.appendChild(firstNameInputBox);
    form.appendChild(lastNameInputBox);
    form.appendChild(newEmailInputBox);
    form.appendChild(newPasswordInputBox);
    form.appendChild(createAccountButton);
    form.appendChild(loginRegistDiv);
    formBox.appendChild(registerHeading);
    formBox.appendChild(form);
    wrapperRegister.appendChild(formBox);
    
    // Helper function to create an input box with icon
    function createInputBox(id, label, iconName) {
      const inputBox = document.createElement("div");
      inputBox.className = "input-box";
    
      const iconSpan = document.createElement("span");
      iconSpan.className = "icon";
      const iconIon = document.createElement("ion-icon");
      iconIon.name = iconName;
      iconSpan.appendChild(iconIon);
      inputBox.appendChild(iconSpan);
    
      const input = document.createElement("input");
      input.type = "text";
      input.id = id;
      input.name = id;
      input.required = true;
      inputBox.appendChild(input);
    
      const inputLabel = document.createElement("label");
      inputLabel.htmlFor = id;
      inputLabel.textContent = label;
      inputBox.appendChild(inputLabel);
    
      const errorDiv = document.createElement("div");
      errorDiv.className = "error";
      inputBox.appendChild(errorDiv);
    
      return inputBox;
    }
    
    // Append the wrapper_register div to the desired parent element
    // For example:
    // const parentElement = document.getElementById("parent-element-id");
    // parentElement.appendChild(wrapperRegister);


let selectGender = function () {
    let selectHeader = document.querySelectorAll('.select_header');
    let selectItem = document.querySelectorAll('.select_item');
  
    selectHeader.forEach(item => {
      item.addEventListener('click', seletToggle);
    });
  
    selectItem.forEach(item => {
      item.addEventListener('click', selectChoose);
    });
  
    function seletToggle() {
      this.parentElement.classList.toggle('is-active');
    }
  
    function selectChoose() {
      let value = this.innerText,
        select = this.closest('.select');
      document.getElementById('gender').value = value;
      select.classList.remove('is-active');
    }
  };
  
  selectInput.addEventListener('focus', selectGender);
  
    
    
    form.addEventListener('submit', e => {
      e.preventDefault();
    
      callback()
    });

    return wrapperRegister;
}