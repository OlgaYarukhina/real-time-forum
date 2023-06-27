export function CreateLoginForm(callback){
            // Create the wrapper_login div
const wrapperLogin = document.createElement("div");
wrapperLogin.className = "wrapper_login";

// Create the form-box login div
const formBox = document.createElement("div");
formBox.className = "form-box login";

// Create the h3 element for Login
const loginHeading = document.createElement("h3");
loginHeading.textContent = "Login";

// Create the form element
const form = document.createElement("form");
form.id = "form-login";

// Create the email input box
const emailInputBox = createInputBox("email", "Email", "at-outline");

// Create the password input box
const passwordInputBox = createInputBox("password", "Password", "key-outline");
passwordInputBox.querySelector("input").type = "password";
passwordInputBox.querySelector("input").size = "8";

// Create the login button
const loginButton = document.createElement("button");
loginButton.type = "submit";
loginButton.className = "btn";
loginButton.textContent = "Login";

// Create the login-regist div
const loginRegistDiv = document.createElement("div");
loginRegistDiv.className = "login-regist";

// Create the paragraph element
const loginRegistParagraph = document.createElement("p");
loginRegistParagraph.textContent = "Don't have an account?";

// Create the anchor element
const registLink = document.createElement("a");
registLink.href = "/register";
registLink.className = "regist-link";
registLink.dataset.link = "Create account";
registLink.textContent = "Create account";

// Append elements to the appropriate parent elements
loginRegistParagraph.appendChild(registLink);
loginRegistDiv.appendChild(loginRegistParagraph);
form.appendChild(emailInputBox);
form.appendChild(passwordInputBox);
form.appendChild(loginButton);
form.appendChild(loginRegistDiv);
formBox.appendChild(loginHeading);
formBox.appendChild(form);
wrapperLogin.appendChild(formBox);

// Append the wrapper_login div to the document body
document.body.appendChild(wrapperLogin);

// Function to create an input box with label and icon
function createInputBox(id, label, iconName) {
    const inputBox = document.createElement("div");
    inputBox.className = "input-box";
  
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon";
    
    const icon = document.createElement("ion-icon");
    icon.name = iconName;
    
    iconSpan.appendChild(icon);
  
    const input = document.createElement("input");
    input.id = id;
    input.name = id;
    input.required = true;
  
    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = id;
    inputLabel.textContent = label;
  
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
  
    inputBox.appendChild(iconSpan);
    inputBox.appendChild(input);
    inputBox.appendChild(inputLabel);
    inputBox.appendChild(errorDiv);
  
    return inputBox;
  }

form.addEventListener("submit", e => {
  e.preventDefault();
  callback();
});

return wrapperLogin;
}