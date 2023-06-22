import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import ChatView from "./views/ChatView.js"
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import CreatePost from "./views/CreatePost.js";
import ChatsList from "./views/ChatsList.js";

import { getChat } from "./hooks/ChatViewHook.js";

var websocket;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

let alerMsg = "";

const navigateTo =  (url, msg="") => {
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
    if (match.route.path === "/login" || match.route.path === "/register"){
        document.getElementById("nav").style.display = 'none';
    } else {
        document.getElementById("nav").style.display = 'flex';
    }

    if((localStorage.getItem("sessionToken") === null || localStorage.getItem("sessionId") === null) && 
        !(match.route.path === "/login" || match.route.path === "/register" )){
        navigateTo("http://localhost:8080/login")
    } else {

        if (match.route.path === "/login" || match.route.path === "/register"){
            //document.getElementById("nav").style.display = 'none';
        } else {
            //document.getElementById("nav").style.display = 'flex';
            if (typeof websocket !== "undefined" && websocket.readyState === WebSocket.OPEN) {
                console.log("WebSocket connection is open.");
            } else {
                console.log("WebSocket connection is not open. Opening ...");
                websocket = await connectWebsocket();
                //handle if cannot open?
            }
        }

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



//------
// TODO : move to new file?
class Event {
    // Each Event needs a Type
    // The payload is not required
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

class SendMessageEvent {
    constructor(message, from) {
        this.message = message;
        this.from = from;
    }
}

class NewMessageEvent {
    constructor(message, from, sent, to) {
        this.message = message;
        this.from = from;
        this.sent = sent;
        this.to = to;
    }
}

class ChangeChatRoomEvent {
    constructor(name) {
        this.name = name;
    }
}

class ClientChangesEvent {
    constructor(userNickname, status) {
        this.userNickname = userNickname;
        this.status = status;
    }
}

function routeEvent(event) {
    console.log("event routing starts")

    if (event.type === undefined) {
        alert("no 'type' field in event");
    }

    // TODO : complete events handling
    switch (event.type) {
        case "new_message":
            // Format payload
            const messageEvent = Object.assign(new NewMessageEvent, event.payload);
            console.log(messageEvent)
            appendChatMessage(messageEvent);
            break;
        case "client_changes":
            const clientChangesEvent = Object.assign(new ClientChangesEvent, event.payload);
            console.log("client changes handled!")
            console.log(clientChangesEvent.userNickname)
            console.log(clientChangesEvent.status)
            //applyClientChanges(clientChangesEvent)
            break;
        default:
            alert("unsupported message type");
            break;
    }

}

var chattingUserId;
//var historyPage = 0;

export function loadMoreMsgs(){
    console.log("chatting user id "+ chattingUserId)
    console.log("history page "+ historyPage)
    let loadedMsgs = getChat(chattingUserId, historyPage);
    console.log(loadedMsgs);
    historyPage = historyPage + 1;
}


// TODO : move to chat view component
function appendChatMessage(messageEvent) {
    console.log("TRYING TO APPEND chattingUserId -  "+ chattingUserId)
    if (chattingUserId == messageEvent.from || chattingUserId == messageEvent.to){
        // console.log("appedning msg");
        // console.log(messageEvent.message)
        // let textarea = document.getElementById("wrapperchat");
        // let text = document.createElement("div")
        // text.innerHTML = messageEvent.message;
        // console.log(text);
        // textarea.appendChild(text);
        const wrapperDisplayMessages = document.getElementById('wrapper_display_messages');

        const message = document.createElement('div');
        const body = document.createElement('p');
        body.classList.add('post_content');
        body.textContent = messageEvent.message;
        const createdAt = document.createElement('div');
        createdAt.classList.add('created_at');
        createdAt.textContent = messageEvent.sent;

        if (messageEvent.to == chattingUserId) {
            message.classList.add('sender');
        } else {
            message.classList.add('receiver');
        }
        message.appendChild(body);
        message.appendChild(createdAt);
        wrapperDisplayMessages.appendChild(message);
    } 
}

// TODO : move to "go to chat" component
export function changeChatRoom(id) {
    if (id !== chattingUserId){
        //historyPage = 0;
        chattingUserId = id;
        console.log("id for room changing - "+id);
        let changeEvent = new ChangeChatRoomEvent(localStorage.getItem("userId")+"&"+id);
        sendEvent("change_room", changeEvent);
    }
    return false;
}

// TODO : move to chat view
export function sendMessage(id) {
    console.log("sending msg through ws connection")
    var newmessage = document.getElementById('writeMessage');
    if (newmessage != null) {
        let outgoingEvent = new SendMessageEvent(newmessage.value, parseInt(localStorage.getItem("userId"),10));
        console.log("sending message")
        console.log(newmessage.value)
        sendEvent("send_message", outgoingEvent)
    }
    return false;
}

function sendEvent(eventName, payload) {
    if (websocket.readyState === WebSocket.OPEN) {
        const event = new Event(eventName, payload);
        websocket.send(JSON.stringify(event));
    } else {
        console.log('WebSocket not open yet. Waiting and retrying...');
        setTimeout(sendEvent, 500, eventName, payload); // Retry after 0.5 seconds
    }
  }

//---

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
            // TODO : ask for reconnect
            document.querySelector("#nav_chats").innerHTML = "";
            navigateTo("/login");
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


if (typeof websocket !== "undefined" && websocket.readyState === WebSocket.OPEN) {
    websocket = await connectWebsocket();
}