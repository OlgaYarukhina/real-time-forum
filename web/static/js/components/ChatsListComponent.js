export async function CreateChatsList(callback) {

  let returnedUsers = await callback()
  console.log(returnedUsers)

  const wrapperChatsList = document.createElement("div");
  wrapperChatsList.className = "chats_list";

  const chats = document.createElement("div");
  chats.className = "nav_chats";
  chats.textContent = "Chats"

  wrapperChatsList.appendChild(chats);

  // containers for each type of users 
  const wrapperChatsActiveUnRead = document.createElement("div");
  const wrapperChatsActiveRead = document.createElement("div");
  const wrapperChatsUnactiveUnRead = document.createElement("div");
  const wrapperChatsUnactiveRead = document.createElement("div");
  const wrapperChatsActiveNoMessage = document.createElement("div");
  const wrapperChatsUnactiveNoMessage = document.createElement("div");


  //loops
  // TODO: add icons

  for (let i = 0; i < returnedUsers.length; i++) {
    if (returnedUsers[i].isactive === true) {

      //1. users online with unread letter
      if (returnedUsers[i].isunread === true) {
        const activeUsersUnread = document.createElement("div");
        activeUsersUnread.className = "activ_user";
        const nickname = document.createElement("span");
        activeUsersUnread.href = `/chat:${returnedUsers[i].user_id}`;
        activeUsersUnread.setAttribute('data-link', '');
        nickname.textContent = returnedUsers[i].nickname;
        activeUsersUnread.appendChild(nickname);
        wrapperChatsActiveUnRead.appendChild(activeUsersUnread);
        //2. users online with all read letters
      } else if (returnedUsers[i].ismessage === true && returnedUsers[i].isunread === false) {
        const activeUsersRead = document.createElement("div");
        activeUsersRead.className = "activ_user";
        const nickname = document.createElement("span");
        activeUsersRead.href = `/chat:${returnedUsers[i].user_id}`;
        activeUsersRead.setAttribute('data-link', '');
        nickname.textContent = returnedUsers[i].nickname;
        activeUsersRead.appendChild(nickname);
        wrapperChatsActiveRead.appendChild(activeUsersRead);
      } else {
        //5. Activ users without chats
        const activeUsers = document.createElement("div");
        activeUsers.className = "activ_user";
        const nickname = document.createElement("span");
        activeUsers.href = `/chat:${returnedUsers[i].user_id}`;
        activeUsers.setAttribute('data-link', '');
        nickname.textContent = returnedUsers[i].nickname;
        activeUsers.appendChild(nickname);
        wrapperChatsActiveNoMessage.appendChild(activeUsers);
      }
    } else {
      //3. users offline with all unread letters
      if (returnedUsers[i].isunread === true) {
        const unactiveUsersUnRead = document.createElement("div");
        unactiveUsersUnRead.className = "unactiv_user";
        const nickname = document.createElement("span");
        unactiveUsersUnRead.href = `/chat:${returnedUsers[i].user_id}`;
        unactiveUsersUnRead.setAttribute('data-link', '');
        nickname.textContent = returnedUsers[i].nickname;
        unactiveUsersUnRead.appendChild(nickname);
        wrapperChatsUnactiveUnRead.appendChild(unactiveUsersUnRead);
         //4. users offline with all unread letters
      } else if (returnedUsers[i].ismessage === true && returnedUsers[i].isunread === false) {
        const unactiveUsersUnRead = document.createElement("div");
        unactiveUsersUnRead.className = "unactiv_user";
        unactiveUsersUnRead.href = `/chat:${returnedUsers[i].user_id}`;
        unactiveUsersUnRead.setAttribute('data-link', '');
        const nickname = document.createElement("span");
        nickname.textContent = returnedUsers[i].nickname;
        unactiveUsersUnRead.appendChild(nickname);
        wrapperChatsUnactiveRead.appendChild(unactiveUsersUnRead);
        //6. Unactiv users without chats
      } else {
        const unactiveUsers = document.createElement("div");
        unactiveUsers.className = "unactiv_user";
        unactiveUsers.href = `/chat:${returnedUsers[i].user_id}`;
        unactiveUsers.setAttribute('data-link', '');
        const nickname = document.createElement("span");
        nickname.textContent = returnedUsers[i].nickname;
        unactiveUsers.appendChild(nickname);
        wrapperChatsUnactiveNoMessage.appendChild(unactiveUsers);
      }
    }
  }



  wrapperChatsList.appendChild(wrapperChatsActiveUnRead);
  wrapperChatsList.appendChild(wrapperChatsActiveRead);
  wrapperChatsList.appendChild(wrapperChatsUnactiveUnRead);
  wrapperChatsList.appendChild(wrapperChatsUnactiveRead);
  wrapperChatsList.appendChild(wrapperChatsActiveNoMessage);
  wrapperChatsList.appendChild(wrapperChatsUnactiveNoMessage);


  return wrapperChatsList;
}



//<div class="chat_list">
//<div class="activ_user">
//     <span class="icon"><ion-icon name="mail-unread-outline"></ion-icon></span>
//     <span>Active user1</span>
// </div>
// <div class="activ_user">
//     <span class="icon"><ion-icon name="mail-open-outline"></ion-icon></ion-icon></span>
//     <span>Active user2</span>
// </div>
// <div class="unactiv_user">
//     <span class="icon"><ion-icon name="mail-unread-outline"></ion-icon></span>
//     <span>Unactive user1</span>
// </div>
// <div class="unactiv_user">
//     <span class="icon"><ion-icon name="mail-open-outline"></ion-icon></span>
//     <span>Unactive user2</span>
// </div>
// </div>