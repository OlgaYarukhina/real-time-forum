import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Log in page");
    }

    async getHtml() {
        return `
        <div class="wrapper_login">
            <div class="form-box login">
                <h3>Login</h3>
                <form id ="form-login">
                    <div class="input-box">
                        <span class="icon"><ion-icon name="at-outline"></ion-icon></span>
                        <input type="email" id="email" name="email" required>
                        <label for="email">Email</label>
                        <div class="error"></div>
                    </div>
                    <div class="input-box">
                        <span class="icon"><ion-icon name="key-outline"></ion-icon></span>
                        <input type="password" id="password" name="password" required>
                        <label for="password">Password</label>
                        <div class="error"></div>
                    </div>

                    <button type="submit" class="btn">Login</button>

                    <div class="login-regist">
                        <p>Don't have an account? <a href="/register" class="regist-link" data-link>Create account</a>
                    </div>
                    </form>
            </div>
        </div>    
        `;
    }


     async getScripts(document) {
        var scripts = [];
      
        var script1 = document.createElement('script');
        script1.src = '/static/js/LoginCode.js';
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