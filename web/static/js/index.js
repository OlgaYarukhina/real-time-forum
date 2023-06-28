import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import ChatView from "./views/ChatView.js"
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import CreatePost from "./views/CreatePost.js";
import ChatsList from "./views/ChatsList.js";

import { getChat } from "./hooks/ChatViewHook.js";

var websocket;
let alerMsg = "";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = (url, msg = "") => {
    alerMsg = msg;
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    console.log("routing to " + location.pathname);
    const routes = [
        { path: "/", view: Posts },
        { path: "/new_post", view: CreatePost },
        { path: "/view_post:id", view: PostView },
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
    if (match.route.path === "/login" || match.route.path === "/register") {
        document.getElementById("nav").style.display = 'none';
    } else {
        document.getElementById("nav").style.display = 'flex';
    }

    if ((localStorage.getItem("sessionToken") === null || localStorage.getItem("sessionId") === null) &&
        !(match.route.path === "/login" || match.route.path === "/register")) {
        navigateTo("http://localhost:8080/login")
    } else {
        if (match.route.path === "/login" || match.route.path === "/register") {
        } else {
            if (typeof websocket !== "undefined" && websocket.readyState === WebSocket.OPEN) {
                console.log("WebSocket connection is open.");
            } else {
                console.log("WebSocket connection is not open. Opening ...");
                websocket = await connectWebsocket();
                //handle if cannot open?
            }
        }

        if (alerMsg !== "") {
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
        let el = document.getElementById('wrapper_display_messages');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }
};

window.addEventListener("popstate", router)
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
    constructor(message, from, sent, to, fromnick, tonick) {
        this.message = message;
        this.from = from;
        this.sent = sent;
        this.to = to;
        this.fromnick = fromnick;
        this.tonick = tonick;
    }
}

class ChangeChatRoomEvent {
    constructor(name) {
        this.name = name;
    }
}

class ClientChangesEvent {
    constructor(userNickname, userId, status) {
        this.userNickname = userNickname;
        this.userId = userId;
        this.status = status;
    }
}

function routeEvent(event) {
    if (event.type === undefined) {
        alert("no 'type' field in event");
    }

    // TODO : complete events handling
    switch (event.type) {
        case "new_message":
            // Format payload
            const messageEvent = Object.assign(new NewMessageEvent, event.payload);
            appendChatMessage(messageEvent);
            break;
        case "client_changes":
            const clientChangesEvent = Object.assign(new ClientChangesEvent, event.payload);
            applyClientChanges(clientChangesEvent)
            break;
        default:
            alert("unsupported message type");
            break;
    }
}


function applyClientChanges(clientChangesEvent) {
    if (clientChangesEvent.status === "online") {
        const usercur = document.getElementById("online_user_" + clientChangesEvent.userId)
        if (!usercur) {
            const wrapperOnlineUsers = document.getElementById("wrapperOnlineUsers");
            const user = document.createElement("div");
            user.className = "activ_user";
            user.setAttribute('data-link', '');
            user.setAttribute('id', "online_user_" + clientChangesEvent.userId);
            user.href = `/chat:${clientChangesEvent.userId}`;
            user.textContent = clientChangesEvent.userNickname;
            wrapperOnlineUsers.prepend(user);
        }
    } else {
        const user = document.getElementById("online_user_" + clientChangesEvent.userId)
        if (user) {
            user.parentNode.removeChild(user);
        }
    }
}

var chattingUserId;

export function loadMoreMsgs() {
    let loadedMsgs = getChat(chattingUserId, historyPage)
    historyPage = historyPage + 1;
}


// TODO : move to chat view component
function appendChatMessage(messageEvent) {
    // notification about new msg
    if (parseInt(messageEvent.to) != chattingUserId) {
        const notification = document.getElementById("aler")
        notification.style.display = "flex"
        notification.innerHTML = "YO, new message from " + messageEvent.fromnick;
        setTimeout(() => notification.style.display = "none", 2500);
    }


    // if (chattingUserId == parseInt(messageEvent.from) || chattingUserId == parseInt(messageEvent.to)) {
    moveChatList(messageEvent)

    const wrapperDisplayMessages = document.getElementById('wrapper_display_messages');
    const message = document.createElement('div');
    const nickname = document.createElement('h4');
    const body = document.createElement('p');
    body.classList.add('message');
    body.textContent = messageEvent.message;
    const createdAt = document.createElement('div');
    createdAt.classList.add('created_at_chat');
    createdAt.textContent = messageEvent.sent.slice(11, 16);

    if (parseInt(messageEvent.to) == chattingUserId) {
        message.classList.add('sender');
        nickname.textContent = messageEvent.fromnick;
    } else {
        message.classList.add('receiver');
        nickname.textContent = messageEvent.fromnick
    }
    message.appendChild(nickname);
    message.appendChild(body);
    message.appendChild(createdAt);
    wrapperDisplayMessages.appendChild(message);
    wrapperDisplayMessages.scrollTop = wrapperDisplayMessages.scrollHeight;

    //  }
}

function moveChatList(messageEvent) {
    var parent = document.getElementById('users_with_msg');
    const icon = document.getElementById(`icon${messageEvent.to}`);
    if (icon) {
        icon.style.display = "inline";
    }
    const icon2 = document.getElementById(`icon${messageEvent.from}`);
    if (icon2) {
        icon2.style.display = "inline";
    }
    let user = document.getElementById(parseInt(messageEvent.to));
    if (!user) {
        user = document.getElementById(parseInt(messageEvent.from));
    }
    const userMove = user;
    user.remove();
    parent.prepend(userMove);
};


// TODO : move to "go to chat" component
export function changeChatRoom(id) {
    if (id !== chattingUserId) {
        //historyPage = 0;
        chattingUserId = id;
        console.log("id for room changing - " + id);
        let changeEvent = new ChangeChatRoomEvent(localStorage.getItem("userId") + "&" + id);
        sendEvent("change_room", changeEvent);
    }
    return false;
}

// TODO : move to chat view
export function sendMessage(id) {
    var newmessage = document.getElementById('writeMessage');
    if (newmessage != null) {
        let outgoingEvent = new SendMessageEvent(newmessage.value, parseInt(localStorage.getItem("userId"), 10));
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