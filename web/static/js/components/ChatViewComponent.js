export async function CreateChatBlocks(callbackGetMessage, callbackCreateMessage, id) {

    let returnedMessages = await callbackGetMessage(id);

    console.log("returnedMessages");
    console.log(returnedMessages);

    const wrapperChat = document.createElement('div');
    wrapperChat.setAttribute("id", "wrapperchat");
    wrapperChat.classList.add('wrapper_chat');

    const wrapperDisplayMessages = document.createElement('div');
    wrapperDisplayMessages.classList.add('wrapper_display_messages');


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

            if (returnedMessages[i].reciver_id === id) {
                message.classList.add('receiver');
            } else {
                message.classList.add('sender');
            }
            message.appendChild(body);
            message.appendChild(createdAt);
            wrapperDisplayMessages.prepend(message);
        }
    }

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
        console.log("click");
        wrapped()
    })

    wrapperChat.appendChild(wrapperWriteMessage);
    return wrapperChat;
}

function callbackCreateMessageWrap(id, f){
    return function() {
        console.log("into");
        f(id);
    }
}
