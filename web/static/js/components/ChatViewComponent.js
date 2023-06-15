export async function CreateChatBlocks(callback) {

    //let returnedSendMessange = await callback(id);
    //let returnedReceiveMessange = await callback(id);


    const wrapperChat = document.createElement('div');
    wrapperChat.classList.add('wrapper_chat');

    //if (returnedSendMessange != null) {
    //  for (let i = 0; i < returnedSendMessange.length; i++) {

    const sender = document.createElement('div');
    sender.classList.add('sender');

    const nicknameS = document.createElement('h4');
    //nickname.textContent = returnedPost.comments[i].nickname;
    nicknameS.textContent = "Nick";

    const createdAtS = document.createElement('div');
    createdAtS.classList.add('created_at');
    //createdAt.textContent = returnedPost.comments[i].created_at;
    createdAtS.textContent = "Time";

    const bodyS = document.createElement('p');
    bodyS.classList.add('post_content');
    //bodyS.textContent = returnedPost.comments[i].comment;
    bodyS.textContent = "Love IT Love IT Love It Love IT";


    sender.appendChild(nicknameS);
    sender.appendChild(createdAtS);
    sender.appendChild(bodyS);

    wrapperChat.appendChild(sender);
    //  }
    //  }


    //if (returnedSendMessange != null) {
    //  for (let i = 0; i < returnedSendMessange.length; i++) {

    const receiver = document.createElement('div');
    receiver.classList.add('receiver');

    const nickname = document.createElement('h4');
    //nickname.textContent = returnedPost.comments[i].nickname;
    nickname.textContent = "Nick";

    const createdAt = document.createElement('div');
    createdAt.classList.add('created_at');
    //createdAt.textContent = returnedPost.comments[i].created_at;
    createdAt.textContent = "Time";

    const body = document.createElement('p');
    body.classList.add('post_content');
    //comment.textContent = returnedPost.comments[i].comment;
    body.textContent = "Love IT Love IT Love It Love IT";


    receiver.appendChild(nickname);
    receiver.appendChild(createdAt);
    receiver.appendChild(body);

    wrapperChat.appendChild(receiver);
    //  }
    //  }


}