// TODO : complete and find correct place

import { navigateTo } from "../index.js";

document.getElementById("logout").addEventListener("click", async e => {
    try {
        const response = await fetch('http://localhost:8080/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Session-Token': localStorage.getItem("sessionToken"),
                'X-Session-Id': localStorage.getItem("sessionId")
            },
        });
    } catch (err) {
        console.error(err);
    }
    navigateTo("http://localhost:8080/login");
});
