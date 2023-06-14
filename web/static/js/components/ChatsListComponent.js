export async function CreateChatsList(callback) {

  let returnedUsers = await callback()
  console.log(returnedUsers)

  const wrapperChatsList = document.createElement("div");
  wrapperChatsList.className = "chats_list";

  const chats= document.createElement("div");
  chats.className = "nav_chats";
  chats.textContent = "Chats"

  wrapperChatsList.appendChild(chats);

  // containers for each type of users 
  const wrapperChatsActiveUnRead = document.createElement("div");
  const wrapperChatsActiveRead  = document.createElement("div");
  const wrapperChatsUnactiveUnRead  = document.createElement("div");
  const wrapperChatsUnactiveRead  = document.createElement("div");
  const wrapperChatsActiveNoMessage = document.createElement("div");
  const wrapperChatsUnactiveNoMessage = document.createElement("div");


  //loops
  // TODO: add icons

  for (let i = 0; i < returnedUsers.length; i++) {
    //1. users online with unread letter
    if (returnedUsers[i].isactive === true && returnedUsers[i].isunread === true) {
      const activeUsersUnread = document.createElement("div");
      activeUsersUnread.className = "activ_user";
      const nickname = document.createElement("span");
      nickname.textContent = returnedUsers[i].nickname;
      activeUsersUnread.appendChild(nickname);

      wrapperChatsActiveUnRead.appendChild(activeUsersUnread);
    }

    //2. users online with all read letters
    if (returnedUsers[i].isactive === true && returnedUsers[i].isunread === false) {
      const  activeUsersRead = document.createElement("div");
      activeUsersRead.className = "activ_user";
      const nickname = document.createElement("span");
      nickname.textContent = returnedUsers[i].nickname;
      activeUsersRead.appendChild(nickname);
      
      wrapperChatsActiveRead.appendChild(activeUsersRead);
    }

    //3. users offline with all unread letters
    if (returnedUsers[i].isactive === false && returnedUsers[i].isunread === true) {
      const unactiveUsersUnRead = document.createElement("div");
      unactiveUsersUnRead.className = "unactiv_user";
      const nickname = document.createElement("span");
      nickname.textContent = returnedUsers[i].nickname;
      unactiveUsersUnRead.appendChild(nickname);

      wrapperChatsUnactiveUnRead.appendChild(unactiveUsersUnRead);
    }

     //4. users offline with all unread letters
     if (returnedUsers[i].isactive === false && returnedUsers[i].isunread === false) {
      const unactiveUsersUnRead = document.createElement("div");
      unactiveUsersUnRead.className = "unactiv_user";
      const nickname = document.createElement("span");
      nickname.textContent = returnedUsers[i].nickname;
      unactiveUsersUnRead.appendChild(nickname);

      wrapperChatsUnactiveRead.appendChild(unactiveUsersUnRead);
    }
      //5. Activ users without chats

      if (returnedUsers[i].isactive === true && returnedUsers[i].ismessage === false) {
        const activeUsers = document.createElement("div");
        activeUsers.className = "unactiv_user";
        const nickname = document.createElement("span");
        nickname.textContent = returnedUsers[i].nickname;
        activeUsers.appendChild(nickname);
  
        wrapperChatsActiveNoMessage.appendChild(activeUsers);
      }


      //6. Unactiv users without chats

      if (returnedUsers[i].isactive === false && returnedUsers[i].ismessage === false) {
        const unactiveUsers = document.createElement("div");
        unactiveUsers.className = "unactiv_user";
        const nickname = document.createElement("span");
        nickname.textContent = returnedUsers[i].nickname;
        unactiveUsers.appendChild(nickname);
  
        wrapperChatsUnactiveNoMessage.appendChild(unactiveUsers);
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