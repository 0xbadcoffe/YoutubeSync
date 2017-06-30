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

//Main homepage
function joinRoom() {
    alert('shit');
    var div = document.createElement("div");
    div.id = "roomBox"

    var joinRoomButton = document.createElement("button")
    joinRoomButton.innerText = "Join a Room";
    joinRoomButton.className = "buttons1";

    var createRoomButton = document.createElement("button");
    createRoomButton.innerText = "Create a Room";
    createRoomButton.className = "buttons1";

    div.appendChild(createRoomButton);
    div.appendChild(joinRoomButton);
    document.getElementsByTagName('body')[0].appendChild(div);
}