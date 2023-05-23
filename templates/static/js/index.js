//import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
//import Settings from "./views/Settings.js";
//import Chats from "./views/Chats.js"
import ChatView from "./views/ChatView.js"
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import NewPost from "./views/NewPost.js";
//import "./RegisterCode.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = (url, msg={}) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        //is it good way or /posts cleaner? 
        { path: "/", view: Posts },
        //{ path: "/posts", view: Posts },
        { path: "/post", view: NewPost },
        { path: "/posts/:id", view: PostView },
        //for profile?
        //{ path: "/settings", view: Settings },
        //different login in place where ws connection creates
        //{ path: "/chats", view: Chats },
        { path: "/chats/:id", view: ChatView },
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

    const view = new match.route.view(getParams(match));

    var scripts = await view.getScripts(document);
    document.querySelector("#app").innerHTML = await view.getHtml();
    scripts.forEach(function(script) {
        document.querySelector("#app").appendChild(script);
    });
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

//connect to ws right here?
//to be able to receive new msg notifications independently of a page
//create section as in discord 
//subscribe on events
//if new msg and correct chat is open - display msg
//is not add +1 unread to correct user
//in both cases reorder chats section 