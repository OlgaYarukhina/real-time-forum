import { loadMoreMsgs } from "../index.js";


export async function CreateChatBlocks(callbackGetMessage, callbackCreateMessage, id) {

    let returnedMessages = await callbackGetMessage(id);

    console.log("returnedMessages");
    console.log(returnedMessages);

    const wrapperChat = document.createElement('div');
    wrapperChat.setAttribute("id", "wrapperchat");
    wrapperChat.classList.add('wrapper_chat');

    const wrapperDisplayMessages = document.createElement('div');
    wrapperDisplayMessages.classList.add('wrapper_display_messages');
    wrapperDisplayMessages.setAttribute("id", "wrapper_display_messages");


    if (returnedMessages != null) {
        for (let i = returnedMessages.length-1; i >= 0; i--) {
            const message = document.createElement('div');
            const body = document.createElement('p');
            body.classList.add('post_content');
            body.textContent = returnedMessages[i].body;
            const createdAt = document.createElement('div');
            createdAt.classList.add('created_at');
            createdAt.textContent = returnedMessages[i].created_at.slice(11, 16);
            console.log(returnedMessages[i].created_at)

            if (returnedMessages[i].receiver_id === parseInt(id.substr(1), 10)) {
                message.classList.add('receiver');
            } else {
                message.classList.add('sender');
            }
            message.appendChild(body);
            message.appendChild(createdAt);
            wrapperDisplayMessages.prepend(message);
        }
    }

    let wr = callbackLoadMoreWrap(id, returnedMessages[returnedMessages.length-1], callbackGetMessage)

    wrapperDisplayMessages.addEventListener("scroll", function () {
        console.log("scrolling")
        if (wrapperDisplayMessages.scrollTop == 0){
        console.log("loading more msgs")
            //loadMoreMessages();
            //loadMoreMsgs();
            wr()
        }
    });

    wrapperChat.appendChild(wrapperDisplayMessages);

    // div write message

    const wrapperWriteMessage = document.createElement('div');
    wrapperWriteMessage.classList.add('wrapper_write_message');

    const form = document.createElement('form');
    form.id = 'write_message';

    const textarea = document.createElement('textarea');
    textarea.classList.add('input-box_textarea_chat');
    textarea.id = 'writeMessage';
    textarea.name = 'writeMessage';
    textarea.placeholder = 'Add comment';
    textarea.rows = '1';
    textarea.required = true;

    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.classList.add('btn');
    sendButton.classList.add('btn-narrow');
    sendButton.textContent = 'Send';

    form.appendChild(textarea);
    form.appendChild(sendButton);

    wrapperWriteMessage.appendChild(form);
    let wrapped = callbackCreateMessageWrap(id, callbackCreateMessage);

    form.addEventListener('submit', e => {
        e.preventDefault();
        wrapped()
    })

    wrapperChat.appendChild(wrapperWriteMessage);
    return wrapperChat;
}



function callbackCreateMessageWrap(id, f){
    return function() {
        f(id);
    }
}

function callbackLoadMoreWrap(id, fhm, f, hp = 1){
    //first_history_msg

    console.log("Hetfwyu")

   // let firstHistoryMsg = fhm;
    let historyPage = hp;
    return async function loadMoreMsgs(){

       // let returnedMessages = await f(id, firstHistoryMsg.body, historyPage);
        // if (returnedMessages != null) {
        //     const wrapperDisplayMessages = document.getElementById('wrapper_display_messages');
        //     for (let i = returnedMessages.length-1; i >= 0; i--) {
        //         const message = document.createElement('div');
        //         const body = document.createElement('p');
        //         body.classList.add('post_content');
        //         body.textContent = returnedMessages[i].body;
        //        // const createdAt = document.createElement('div');
        //       //  createdAt.classList.add('created_at');
        //       //createdAt.textContent = returnedMessages[i].created_at;

        //         console.log("typeof(returnedMessages[i].created_at)")
        //         console.log(typeof(returnedMessages[i].created_at))
    
        //         if (returnedMessages[i].receiver_id === parseInt(id.substr(1), 10)) {
        //             message.classList.add('receiver');
        //         } else {
        //             message.classList.add('sender');
        //         }
        //         message.appendChild(body);
        //         message.appendChild(createdAt);
        //         wrapperDisplayMessages.prepend(message);
        //     }
        // }
        historyPage = historyPage + 1;
    }
}
