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
            <textarea class="input-box_textarea" id="postContent" name="postContent" placeholder="Add content" rows="20" required></textarea>
          <br>
       
            <div class="block_checkbox">
                <div class="checkbox"> Category1
                <input type="checkbox" class="checkbox" checked name="namecheckbox_1" value="c1">
                </div>
                <div class="checkbox">Category2
                <input type="checkbox" class="checkbox" name="namecheckbox_2" value="c2">
                </div>
                <div class="checkbox">Category3
                <input type="checkbox" class="checkbox" name="namecheckbox_3" value="c3">
                </div>
            </div>
            <div class="error"></div>
                <button type="submit" class="btn">Create post</button>
                </form>
        </div>
    </div>    
        `;
    }
  
    async getScripts(document) {
        var scripts = [];
      
        var script1 = document.createElement('script');
        script1.src = '/static/js/CreatePostCode.js';
        script1.type = 'module';
        scripts.push(script1);
      
        var script3 = document.createElement('script');
        script3.type = 'module';
        script3.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        scripts.push(script3);
      
        var script4 = document.createElement('script');
        script4.setAttribute('nomodule', '');
        script4.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        scripts.push(script4);
      
        return scripts;
};
}


  