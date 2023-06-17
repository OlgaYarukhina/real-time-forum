export async function CreateChatBlocks(callbackGetMessage, callbackCreateMessage, id) {

    let returnedMessages = await callbackGetMessage(id);

    console.log("returnedMessages");
    console.log(returnedMessages);

    const wrapperChat = document.createElement('div');
    wrapperChat.classList.add('wrapper_chat');

    if (returnedMessages != null) {
        for (let i = 0; i < returnedMessages.length; i++) {
            const message = document.createElement('div');
            const body = document.createElement('p');
            body.classList.add('post_content');
            body.textContent = returnedMessages[i].body;
            const createdAt = document.createElement('div');
            createdAt.classList.add('created_at');
            createdAt.textContent = returnedMessages[i].created_at;

            if (returnedMessages[i].sender_id === id) {
                message.classList.add('sender');
            } else {
                message.classList.add('receiver');
            }
            message.appendChild(body);
            message.appendChild(createdAt);
            wrapperChat.appendChild(message);
        }
    }

    // div write message

    const wrapperWriteMessage = document.createElement('div');
    wrapperWriteMessage.classList.add('wrapper_write_message');

    const form = document.createElement('form');
    form.id = 'write_message';

    const textarea = document.createElement('textarea');
    textarea.classList.add('input-box_textarea');
    textarea.id = 'writeMessage';
    textarea.name = 'writeMessage';
    textarea.placeholder = 'Add comment';
    textarea.rows = '2';
    textarea.required = true;

    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.classList.add('btn');
    sendButton.classList.add('btn-narrow');
    sendButton.textContent = 'Send';

    form.appendChild(textarea);
    form.appendChild(sendButton);

    wrapperWriteMessage.appendChild(form);

    form.addEventListener('submit', e => {
        e.preventDefault();
        callbackCreateMessage();
    })

    wrapperChat.appendChild(wrapperWriteMessage);
    return wrapperChat;
}