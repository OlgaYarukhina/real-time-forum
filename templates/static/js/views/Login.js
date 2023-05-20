import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Log in page");
    }

    async getScripts(document) {
        var scripts = [];
      
        var script1 = document.createElement('script');
        script1.src = '/static/js/style.js';
        scripts.push(script1);
      
        var script2 = document.createElement('script');
        script2.src = '/static/js/register.js';
        scripts.push(script2);
      
        var script3 = document.createElement('script');
        script3.type = 'module';
        script3.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        scripts.push(script3);
      
        var script4 = document.createElement('script');
        script4.setAttribute('nomodule', '');
        script4.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        scripts.push(script4);
      
        return scripts;
    }

    async getHtml() {

        return `
        <div id="fullscreen-overlay">
            <div class="aler"></div>
            <div class="wrapper">
                <div class="form-box login">
                    <h3>Login</h3>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                            <input type="email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="key-outline"></ion-icon></span>
                            <input type="password" required>
                            <label for="password">Password</label>
                        </div>
                        <button type="submit" class="btn" onclick="login()">Login</button>
                        <div class="login-regist">
                            <p>Don't have an account? <a  class="regist-link">Create account</a></p>
                        </div>
                </div>
                <div class="form-box registration">
                    <h3>Create new account</h3>
                    <form action="/login" id ="form">
                        <div class="input-box">
                            <span class="icon"><ion-icon name="person-add-outline"></ion-icon></span>
                            <input type="text" id="newNickname" name="newNickname" required>
                            <label for="nickname">Nickname</label>
                            <div class="error"></div>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="infinite-outline"></ion-icon></span>
                            <input type="number" min = "10" max = "100" id="age" name="age" required>
                            <label for="age">Age</label>
                        </div>
                        <div class="select">
                            <div class="input-box select_header">
                                <span class="icon"><ion-icon name="transgender-outline"></ion-icon></span>
                                <input type="text" id="gender" class="gender" name="gender" required>
                                <label for="gender">Gender</label> 
                            </div>
                            <div class="select_body">
                                <div class="select_item">F</div>
                                <div class="select_item">M</div>
                                <div class="select_item">O</div>
                            </div>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="person-outline"></ion-icon></span>
                            <input type="text" id="firstName" name="firstName" required>
                            <label for="firstName">First Name</label>
                            <div class="error"></div>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="people-outline"></ion-icon></span>
                            <input type="text" id="lastName" name="lastName" required>
                            <label for="lastName">Last Name</label>
                            <div class="error"></div>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                            <input type="email" id="newEmail" name="newEmail" required>
                            <label for="newEmail">Email</label>
                            <div class="error"></div>
                        </div>
                    
                        <div class="input-box">
                            <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                            <input type="password" id="newPassword" name="newPassword" required>
                            <label for="newPassword">Password</label>
                            <div class="error"></div>
                        </div>
                    
                        <button type="submit" class="btn">Create account</button>
                        <div class="login-regist">
                            <p>Already have an account? <a class="login-link">login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;

        /*
        return `
        <div class="wrapper_login">
            <div class="form-box login">
                <h3>Login</h3>
                    <div class="input-box">
                        <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                        <input type="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"><ion-icon name="key-outline"></ion-icon></span>
                        <input type="password" required>
                        <label for="password">Password</label>
                    </div>

                    <button type="submit" class="btn" onclick="login()">Login</button>

                    <div class="login-regist">
                        <p>Don't have an account? <a href="/register" class="regist-link" data-link>Create account</a>
                    </div>
            </div>
        </div>    
        `;
        */
    }
}