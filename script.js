//firebase initialization
var config = {
    apiKey: "AIzaSyAH7CQ-JuB5KFJqFGrQXIF_NxMp-glz6PY",
    authDomain: "music-sync-8212d.firebaseapp.com",
    databaseURL: "https://music-sync-8212d.firebaseio.com",
    projectId: "music-sync-8212d",
    storageBucket: "music-sync-8212d.appspot.com",
    messagingSenderId: "317967865570"
};
firebase.initializeApp(config);

//global vars
var body = document.getElementsByTagName('body')[0];

//Main homepage
function welcomeButtonsPressed() {
    var div = document.createElement("div");
    div.id = "roomBox"

    var joinRoomButton = document.createElement("button")
    joinRoomButton.innerText = "Join a Room";
    joinRoomButton.onclick = clearAll;
    joinRoomButton.className = "buttons1";
    joinRoomButton.id = "joinroombutton";

    var createRoomButton = document.createElement("button");
    createRoomButton.innerText = "Create a Room";
    createRoomButton.className = "buttons1";
    createRoomButton.onclick = clearAll;
    createRoomButton.id = "createroombutton";

    var welcomeBanner = document.createElement("h1");
    welcomeBanner.innerText = "Welcome";
    welcomeBanner.className = "welcome";

    div.appendChild(welcomeBanner);
    div.appendChild(createRoomButton);
    div.appendChild(joinRoomButton);

    document.getElementsByTagName('body')[0].appendChild(div);
}


function clearAll() {
    var sender = this.id;
    body.innerHTML = "";
    var logo = document.createElement("h1");
    logo.innerText = "DJSync";
    body.appendChild(logo);



    switch (sender) {
        case ("createroombutton"):
            console.log(sender + " was pressed");
            createRoom();
            break;
        case ("joinroombutton"):
            console.log(sender + " was pressed");
            joinRoom();
            break;
        default:
            //console.log(sender);
            break;
    }

}

function createRoom() {
    console.log("nothing");
}

function joinRoom() {
    console.log("nothing");

}