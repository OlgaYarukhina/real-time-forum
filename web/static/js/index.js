import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import ChatView from "./views/ChatView.js"
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import CreatePost from "./views/CreatePost.js";
import ChatsList from "./views/ChatsList.js";
//import { register } from "./hooks/RegisterFormHook.js";

var websocket

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

let alerMsg = "";

const navigateTo = (url, msg="") => {
    alerMsg = msg;
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    console.log("routing to "+location.pathname);
    const routes = [
        { path: "/", view: Posts },
        { path: "/new_post", view: CreatePost },
        { path: "/view_post:id", view: PostView },
        //different login in place where ws connection creates
        //{ path: "/chats", view: Chats },
        { path: "/chat:id", view: ChatView },
        { path: "/login", view: Login },
        { path: "/register", view: Register }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        // TODO : add 404 page
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    if((localStorage.getItem("sessionToken") === null || localStorage.getItem("sessionId") === null) && 
        !(match.route.path === "/login" || match.route.path === "/register" )){
        navigateTo("http://localhost:8080/login")
    } else {
        if (alerMsg !== ""){
            console.log("aler");
            document.getElementById("aler").innerHTML = alerMsg;
            alerMsg = "";
            document.getElementById("aler").classList.add('active')
        } else {
            document.getElementById("aler").innerHTML = '';
            document.getElementById("aler").classList.remove('active')
        }
        const view = new match.route.view(getParams(match));
        document.querySelector("#app").innerHTML = "";
        document.querySelector("#app").appendChild(await view.getHtml()); 
    }
    if (match.route.path === "/login" || match.route.path === "/register"){
        document.getElementById("nav").style.display = 'none';
    } else {
        document.getElementById("nav").style.display = 'flex';
        if (typeof websocket !== "undefined" && websocket.readyState === WebSocket.OPEN) {
            console.log("WebSocket connection is open.");
        } else {
            console.log("WebSocket connection is not open. Opening ...");
            websocket = connectWebsocket();
            //handle if cannot open?
        }
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

export { navigateTo, router };

// TODO : add ws connection for receiving active users and its changes

//connect to ws right here?
//to be able to receive new msg notifications independently of a page
//create section as in discord 
//subscribe on events
//if new msg and correct chat is open - display msg
//is not add +1 unread to correct user
//in both cases reorder chats section 

async function connectWebsocket() {
    var conn;
    // Check if the browser supports WebSocket
    if (window["WebSocket"]) {
        console.log("supports websockets");

        var wsUrl = "ws://" + document.location.host + "/api/ws?sessionToken=" + localStorage.getItem("sessionToken") + "&sessionId=" + localStorage.getItem("sessionId");
        conn = new WebSocket(wsUrl);
        // Onopen
        conn.onopen = async function (evt) {
            console.log("conn on open")
            //document.getElementById("connection-header").innerHTML = "Connected to Websocket: true";
            // TODO : get users and add to menu
            document.querySelector("#nav_chats").innerHTML = "";
            let view = new ChatsList()
            document.querySelector("#nav_chats").appendChild(await view.getHtml());
        }

        conn.onclose = function (evt) {
            console.log("conn on close")
            // Set disconnected
            //document.getElementById("connection-header").innerHTML = "Connected to Websocket: false";
            // TODO : clear menu 
            document.querySelector("#nav_chats").innerHTML = "";
        }

        // Add a listener to the onmessage event
        conn.onmessage = function (evt) {
            
            console.log("conn on message")

            console.log(evt);
            // parse websocket message as JSON
            const eventData = JSON.parse(evt.data);
            // Assign JSON data to new Event Object
            const event = Object.assign(new Event, eventData);
            // Let router manage message
            routeEvent(event);

            //do stuff ...
        }

    } else {
        alert("Not supporting websockets");
    }
    return conn
}


websocket = connectWebsocket();