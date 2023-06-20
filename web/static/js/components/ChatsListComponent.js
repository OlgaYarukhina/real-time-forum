export async function CreateChatsList(callback) {

  let returnedUsers = await callback()
  console.log("Herereee")
  console.log(returnedUsers)
  console.log(returnedUsers.withmsg)
  console.log(returnedUsers.withoutmsg)

  const wrapperChatsList = document.createElement("div");
  wrapperChatsList.className = "chats_list";

  const chats = document.createElement("div");
  chats.className = "nav_chats";
  chats.textContent = "Chats"

  wrapperChatsList.appendChild(chats);

  // containers for with message and without message 
  const wrapperChatsWithMessages = document.createElement("div");
  const wrapperChatsWithoutMessages = document.createElement("div");


  //loops
  // TODO: add icons



  for (let i = 0; i < returnedUsers.withmsg.length; i++) {
    const user = document.createElement("div");
    user.setAttribute('data-link', '');
    const nickname = document.createElement("span");
    user.appendChild(nickname);
    user.href = `/chat:${returnedUsers.withmsg[i].user_id}`;
    nickname.textContent = returnedUsers.withmsg[i].nickname;
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
    user.setAttribute('data-link', '');
    const nickname = document.createElement("span");
    user.appendChild(nickname);
    user.href = `/chat:${returnedUsers.withoutmsg[i].user_id}`;
    nickname.textContent = returnedUsers.withoutmsg[i].nickname;
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

  wrapperChatsList.appendChild(wrapperChatsWithMessages);
  wrapperChatsList.appendChild(wrapperChatsWithoutMessages);

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