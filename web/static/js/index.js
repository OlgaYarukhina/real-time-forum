import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
//import Chats from "./views/Chats.js"
import ChatView from "./views/ChatView.js"
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import CreatePost from "./views/CreatePost.js";
//import "./RegisterCode.js";

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
        //is it good way or /posts cleaner? 
        { path: "/", view: Posts },
        //{ path: "/posts", view: Posts },
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
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    // TODO : add access to pages though token
    // if match path is not login or register and no session token in local storage or cookies 
    // - navigate to login page
    // else if token exists 
    // - open requested view
    const view = new match.route.view(getParams(match));

    console.log("aler");
    console.log(alerMsg);
    if (alerMsg !== ""){
        console.log("aler");
        document.getElementById("aler").innerHTML = alerMsg;
        alerMsg = "";
        document.getElementById("aler").classList.add('active')
    } else {
        document.getElementById("aler").innerHTML = '';
        document.getElementById("aler").classList.remove('active')
    }
    //var scripts = await view.getScripts(document);
    document.querySelector("#app").innerHTML = "";
    document.querySelector("#app").appendChild(await view.getHtml()); 
    // scripts.forEach(function(script) {
    //     document.querySelector("#app").appendChild(script);
    // });
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