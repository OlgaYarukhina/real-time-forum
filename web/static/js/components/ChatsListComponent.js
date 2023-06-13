export async function CreateChatsList(callback){

    let returnedUsers = await callback()

    const wrapperChatsList = document.createElement("div");
    wrapperChatsList.className = "chats_list";

    //loops

    //1. users online with unread letter

    const activeUsersUnread = document.createElement("div");
    activeUsersUnread.className = "activ_user";
    const nicknameAU = document.createElement("span");
    nicknameAU.textContent = "Active user1";

    activeUsersUnread .appendChild(nicknameAU);

     //2. users online with all read letters

    const activeUsersRead = document.createElement("div");
    activeUsersRead.className = "activ_user";
    const nicknameAR = document.createElement("span");
    nicknameAR.textContent = "Active user2";

    activeUsersRead.appendChild(nicknameAR);

      //3. users offline with all unread letters
    const unactiveUsersUnRead = document.createElement("div");
    unactiveUsersUnRead.className = "unactiv_user";
    const nicknameUU = document.createElement("span");
    nicknameUU.textContent = "Unactive user1";

    unactiveUsersUnRead.appendChild(nicknameUU);

     //4. users offline with all unread letters
     const unactiveUsersRead = document.createElement("div");
     unactiveUsersRead.className = "unactiv_user";
     const nicknameUR = document.createElement("span");
     nicknameUU.textContent = "Unactive user2";

     unactiveUsersRead.appendChild(nicknameUR);

     //5. Activ users without chats


    //6. Unactiv users without chats


    wrapperChatsList.appendChild(activeUsersUnread);
    wrapperChatsList.appendChild(activeUsersRead);
    wrapperChatsList.appendChild(unactiveUsersUnRead);
    wrapperChatsList.appendChild(unactiveUsersRead);


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