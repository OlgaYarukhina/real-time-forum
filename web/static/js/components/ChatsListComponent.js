export async function CreateChatsList(callback) {

  let returnedUsers = await callback()

  const wrapperChatsList = document.createElement("div");
  wrapperChatsList.className = "chats_list";
  const chats = document.createElement("div");
  chats.className = "nav_chats";
  chats.textContent = "Chats"

  const wrapperChatsWithMessages = document.createElement("div");
  wrapperChatsWithMessages.id = "users_with_msg";
  const wrapperChatsWithoutMessages = document.createElement("div");
  const onlineUsers = document.createElement("div");
  onlineUsers.className = "nav_chats";
  onlineUsers.textContent = "Online"
 
  const wrapperOnlineUsers = document.createElement("div");
  wrapperOnlineUsers.setAttribute("id", "wrapperOnlineUsers")

  wrapperChatsList.appendChild(chats);

  // TODO: add icons with envelope

  for (let i = 0; i < returnedUsers.withmsg.length; i++) {
    const user = document.createElement("div");
    user.id = `${returnedUsers.withmsg[i].user_id}`;
    user.setAttribute('data-link', '');
    user.href = `/chat:${returnedUsers.withmsg[i].user_id}`;
    user.textContent = returnedUsers.withmsg[i].nickname;
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon-chat";
    const icon = document.createElement("ion-icon");
    icon.name = "mail-unread-outline";
    iconSpan.appendChild(icon);
    user.appendChild(iconSpan);
    
    if (returnedUsers.withmsg[i].isactive === true) {
      user.className = "activ_user";
      //1. users online with unread letter
      if (returnedUsers.withmsg[i].isunread === true) {
        wrapperChatsWithMessages.appendChild(user);

        //2. users online with all read letters
      } else if (returnedUsers.withmsg[i].ismessage === true && returnedUsers.withmsg[i].isunread === false) {
        wrapperChatsWithMessages.appendChild(user);
      }
    } else {
      user.className = "unactiv_user";
      //3. users offline with all unread letters
      if (returnedUsers.withmsg[i].isunread === true) {
        wrapperChatsWithMessages.appendChild(user);
        //4. users offline with all unread letters
      } else if (returnedUsers.withmsg[i].ismessage === true && returnedUsers.withmsg[i].isunread === false) {
        wrapperChatsWithMessages.appendChild(user);
      }
    }
  }

  for (let i = 0; i < returnedUsers.withoutmsg.length; i++) {
    const user = document.createElement("div");
    user.id = `${returnedUsers.withoutmsg[i].user_id}`;
    user.setAttribute('data-link', '');
    user.href = `/chat:${returnedUsers.withoutmsg[i].user_id}`;
    user.textContent = returnedUsers.withoutmsg[i].nickname;
    const iconSpan = document.createElement("span");
    iconSpan.id = "icon";
    iconSpan.className = "icon-chat";
    iconSpan.style.display = "none";
    const icon = document.createElement("ion-icon");
    icon.name = "mail-unread-outline";
    iconSpan.appendChild(icon);
    user.appendChild(iconSpan);

    if (returnedUsers.withoutmsg[i].isactive === true) {
      //5. Activ users without chats
      user.className = "activ_user";
      wrapperChatsWithoutMessages.appendChild(user);
    } else {
      //6. Unactiv users without chats
      user.className = "unactiv_user";
      wrapperChatsWithoutMessages.appendChild(user);
    }
  }

  // TODO: add online users

  let joined = [...returnedUsers.withmsg, ...returnedUsers.withoutmsg];

  for (let i = 0; i < joined.length; i++) {
    if(joined[i].isactive){
      const user = document.createElement("div");
      user.className = "activ_user";
      user.setAttribute('data-link', '');
      user.setAttribute('id', "online_user_"+joined[i].user_id);
      user.href = `/chat:${joined[i].user_id}`;
      user.textContent = joined[i].nickname;
      wrapperOnlineUsers.appendChild(user);
    }
  } 
  

  wrapperChatsList.appendChild(wrapperChatsWithMessages);
  wrapperChatsList.appendChild(wrapperChatsWithoutMessages);
  wrapperChatsList.appendChild(onlineUsers);
  wrapperChatsList.appendChild(wrapperOnlineUsers);

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