import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("New post creation page");
    }

    async getHtml() {
        return `
        <div class="wrapper_new_post">
        <div class="form-box">
            <h3>Create post</h3>
            <form id ="create_post">
            <div class="input-box">
                 <span class="icon"><ion-icon name="book-outline"></ion-icon></span>
                 <input type="text" id="postTitle" name="postTitle" required>
                 <label for="postTitle">Title</label>
                 <div class="error"></div>
            </div>
            <textarea class="input-box_textarea" id="content" name="content" placeholder="Add content" rows="20" required></textarea>
          <br>
          <div class="input-box">
                 <span class="icon"><ion-icon name="checkbox-outline"></ion-icon></span>
                 <input type="text" id="chooseCategory" name="chooseCategory" required>
                 <label for="chooseCategory">Choose category</label>
                 <div class="error"></div>
            </div>
                <button type="submit" class="btn">Create post</button>
                </form>
        </div>
    </div>    
        `;
    }
}