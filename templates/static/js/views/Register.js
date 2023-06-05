import AbstractView from "./AbstractView.js";
import { validateInputs } from "./RegisterUtil.js"
import { register  } from "./RegisterFormHook.js";
import { CreateRegisterForm } from "./RegisterFormComponent.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register page");
    }

    async getHtml() {

        return CreateRegisterForm(()=>{
          if (validateInputs()) {
            register();
          }
        });
    }

}