import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register page");
    }

    async getHtml() {
        console.log("new http get chats request (expect list of users, sorted by last msg sended, who is online, others alphabet)")
        return `
            <div class="wrapper">
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
        `;
    }
}