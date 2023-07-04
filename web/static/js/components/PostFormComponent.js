export function CreatePostForm(callback) {
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

inputBox.appendChild(iconSpan);
inputBox.appendChild(inputTitle);
inputBox.appendChild(labelTitle);


// Create the textarea for the post content
const textarea = document.createElement('textarea');
textarea.classList.add('input-box_textarea');
textarea.id = 'postContent';
textarea.name = 'postContent';
textarea.placeholder = 'Add content';
textarea.rows = '18';
textarea.required = true;

// Create the block_checkbox element
// const blockCheckbox = document.createElement('div');
// blockCheckbox.classList.add('block_checkbox');

// Create the checkboxes for the categories
// const categories = ['Category1', 'Category2', 'Category3'];
// for (let i = 0; i < categories.length; i++) {
// const checkboxDiv = document.createElement('div');
// checkboxDiv.classList.add('checkbox');

// const labelCheckbox = document.createElement('label');
// labelCheckbox.textContent = categories[i];

// const checkbox = document.createElement('input');
// checkbox.type = 'checkbox';
// checkbox.classList.add('checkbox');
// checkbox.name = `namecheckbox_${i + 1}`;
// checkbox.value = `${i + 1}`;

// checkboxDiv.appendChild(labelCheckbox);
// checkboxDiv.appendChild(checkbox);

// blockCheckbox.appendChild(checkboxDiv);
// }

const errorDiv = document.createElement("div");
errorDiv.className = "error";

// Create the submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.classList.add('btn');
submitButton.classList.add('btn-narrow');
submitButton.textContent = 'Create post';

// Append all the elements to their respective parents
form.appendChild(inputBox);
form.appendChild(textarea);
form.appendChild(document.createElement('br'));
//form.appendChild(blockCheckbox);
form.appendChild(errorDiv);
form.appendChild(submitButton);

formBox.appendChild(heading);
formBox.appendChild(form);

form.addEventListener('submit', e => {
e.preventDefault();
  callback();
})


wrapperNewPost.appendChild(formBox);

return wrapperNewPost;
}


