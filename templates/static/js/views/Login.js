import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Log in page");
    }

    async getHtml() {
        console.log("new http get chats request (expect list of users, sorted by last msg sended, who is online, others alphabet)")
        return `
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
                        <p>Don't have an account? <a href="/register" class="regist-link nav__link" data-link>Create account</a>
                    </div>
            </div>
        </div>    
        `;
    }
}