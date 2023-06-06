import AbstractView from "./AbstractView.js";
import { validateInputs } from "../utils/RegisterUtil.js"
import { register  } from "../hooks/RegisterFormHook.js";
import { CreateRegisterForm } from "../components/RegisterFormComponent.js";

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