import AbstractView from "./AbstractView.js";
import { navigateTo } from "../index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New post creation page");
    }

    async getHtml() {
        // Create the wrapper_new_post element
const wrapperNewPost = document.createElement('div');
wrapperNewPost.classList.add('wrapper_new_post');

// Create the form-box element
const formBox = document.createElement('div');
formBox.classList.add('form-box');

// Create the h3 element for the heading
const heading = document.createElement('h3');
heading.textContent = 'Create post';

// Create the form element
const form = document.createElement('form');
form.id = 'create_post';

// Create the input box for the post title
const inputBox = document.createElement('div');
inputBox.classList.add('input-box');

const iconSpan = document.createElement('span');
iconSpan.classList.add('icon');
const icon = document.createElement('ion-icon');
icon.setAttribute('name', 'book-outline');
iconSpan.appendChild(icon);

const inputTitle = document.createElement('input');
inputTitle.type = 'text';
inputTitle.id = 'postTitle';
inputTitle.name = 'postTitle';
inputTitle.required = true;

const labelTitle = document.createElement('label');
labelTitle.setAttribute('for', 'postTitle');
labelTitle.textContent = 'Title';

const errorTitle = document.createElement('div');
errorTitle.classList.add('error');

inputBox.appendChild(iconSpan);
inputBox.appendChild(inputTitle);
inputBox.appendChild(labelTitle);
inputBox.appendChild(errorTitle);

// Create the textarea for the post content
const textarea = document.createElement('textarea');
textarea.classList.add('input-box_textarea');
textarea.id = 'postContent';
textarea.name = 'postContent';
textarea.placeholder = 'Add content';
textarea.rows = '20';
textarea.required = true;

// Create the block_checkbox element
const blockCheckbox = document.createElement('div');
blockCheckbox.classList.add('block_checkbox');

// Create the checkboxes for the categories
const categories = ['Category1', 'Category2', 'Category3'];
for (let i = 0; i < categories.length; i++) {
  const checkboxDiv = document.createElement('div');
  checkboxDiv.classList.add('checkbox');

  const labelCheckbox = document.createElement('label');
  labelCheckbox.textContent = categories[i];

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.name = `namecheckbox_${i + 1}`;
  checkbox.value = `c${i + 1}`;

  checkboxDiv.appendChild(labelCheckbox);
  checkboxDiv.appendChild(checkbox);

  blockCheckbox.appendChild(checkboxDiv);
}

// Create the error element for checkboxes
const errorCheckbox = document.createElement('div');
errorCheckbox.classList.add('error');

// Create the submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.classList.add('btn');
submitButton.textContent = 'Create post';

// Append all the elements to their respective parents
form.appendChild(inputBox);
form.appendChild(textarea);
form.appendChild(document.createElement('br'));
form.appendChild(blockCheckbox);
form.appendChild(errorCheckbox);
form.appendChild(submitButton);

formBox.appendChild(heading);
formBox.appendChild(form);

form.addEventListener('submit', e => {
    e.preventDefault();
      createPost();
  })

  const createPost = async () => {
    let categories =[];
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
      if(item.checked === true){
        categories.push(item.value)
      }
    });

    let formData = {
      title: document.getElementById('postTitle').value,
      content: document.getElementById('postContent').value,
      categories: categories,
    }

    console.log(formData.categories)
  
    try {
      console.log(JSON.stringify(formData))
      const response = await fetch('http://localhost:8080/api/create_post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const returnedError = await response.json();
      console.log(returnedError);
  
      if (returnedError.message == "Post was created") {
        navigateTo('http://localhost:8080/');
         // errorFild.classList.add('active');
      // let mess = `<p style = "position: absolute;">Post was created!</p>`;
      // errorFild.innerHTML = mess;
      } else {
        // errorFild.classList.add('active');
      // let mess = `<p style = "position: absolute;">Sorry :(. Post was not created. Please, try later </p>`;
      // errorFild.innerHTML = mess;
      }
  
  
    } catch (err) {
      console.error(err);
    }
}



wrapperNewPost.appendChild(formBox);

return wrapperNewPost;
    //     return `
    //     <div class="wrapper_new_post">
    //     <div class="form-box">
    //         <h3>Create post</h3>
    //         <form id ="create_post">
    //         <div class="input-box">
    //              <span class="icon"><ion-icon name="book-outline"></ion-icon></span>
    //              <input type="text" id="postTitle" name="postTitle" required>
    //              <label for="postTitle">Title</label>
    //              <div class="error"></div>
    //         </div>
    //         <textarea class="input-box_textarea" id="postContent" name="postContent" placeholder="Add content" rows="20" required></textarea>
    //       <br>
       
    //         <div class="block_checkbox">
    //             <div class="checkbox"> Category1
    //             <input type="checkbox" class="checkbox" checked name="namecheckbox_1" value="c1">
    //             </div>
    //             <div class="checkbox">Category2
    //             <input type="checkbox" class="checkbox" name="namecheckbox_2" value="c2">
    //             </div>
    //             <div class="checkbox">Category3
    //             <input type="checkbox" class="checkbox" name="namecheckbox_3" value="c3">
    //             </div>
    //         </div>
    //         <div class="error"></div>
    //             <button type="submit" class="btn">Create post</button>
    //             </form>
    //     </div>
    // </div>    
    //     `;
    }
  
    // async getScripts(document) {
    //     var scripts = [];
      
    //     var script1 = document.createElement('script');
    //     script1.src = '/static/js/CreatePostCode.js';
    //     script1.type = 'module';
    //     scripts.push(script1);
      
    //     var script3 = document.createElement('script');
    //     script3.type = 'module';
    //     script3.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    //     scripts.push(script3);
      
    //     var script4 = document.createElement('script');
    //     script4.setAttribute('nomodule', '');
    //     script4.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    //     scripts.push(script4);
      
    //     return scripts;
    // };
}


  