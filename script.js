function firebaseInit() {
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
}

var appHistory = [];



//global vars
var body = document.getElementsByTagName('body')[0];


// Loads a local HTML file and injects the HTML into the container element
function appendTemplate(templateName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${templateName}.html`, true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== 4) {
            //console.log('error', this.error);
            return;
        }
        appendHistory(templateName);
        document.getElementById('container').innerHTML = this.responseText;
        bootstrapScripts(templateName);
    };
    xhr.send();
}

function appendHistory(templateName) {
    if (appHistory.length < 1) {
        appHistory.push(templateName);
    } else {
        const lastHistory = appHistory[appHistory.length - 1];
        if (lastHistory !== templateName) {
            appHistory.push(templateName);
        }

    }
}

function goBack() {
    if (appHistory.length > 1) {
        const templateName = appHistory[appHistory.length - 2];
        appendTemplate(templateName);
    }
}

//must add every page with buttons to bootStrapScripts
function bootstrapScripts(templateName) {
    switch (templateName) {
        case 'home':
            onSomeBtnClicked();
            break;
        case 'joinRoomPrompt':
            onSomeBtnClicked();
            getActiveRooms();
            break;
        case 'createRoomPrompt':
            onSomeBtnClicked();
            break;
        case 'viewingRoom':
            onSomeBtnClicked();
            break;
        default:
            onSomeBtnClicked();
            break;
    }
}

// Function called when the app initializes 
function bootstrap() {
    console.log('YoutubeSync Bootstrapping...');
    firebaseInit();
    appendTemplate('home');
}

function onSomeBtnClicked() {
    $('#joinRoomButton').on('click', () => {
        appendTemplate('joinRoomPrompt')
    });
    $('#createroombutton').on('click', () => {
        appendTemplate('createRoomPrompt');
    });
    $('#submitJoinRoom').on('click', () => {
        var roomName = document.getElementById('roomName').value;
        if (roomName == "") {
            alert("Please make sure that both the Room Name field is filled");
            return;
        } else {
            fireGet(roomName);
            appendTemplate('viewingRoom');

        }
    });
    $('#submitCreateRoom').on('click', () => {
        var roomName = document.getElementById('roomName').value;
        var video = document.getElementById('video').value;
        if (roomName == "" || video == "") {
            alert("Please make sure that both the Room Name and Video Id fields are filled");
            return;
        } else {
            appendTemplate('viewingRoom');
            fireSet(roomName, video, (new Date).getTime());
        }
    });
}


$(function() {
    bootstrap();
});

function fireSet(roomName, ID, start) {
    console.log("fireset...")
    const promise = firebase.database().ref("Rooms/" + roomName).set({
        videoLink: ID,
        startTime: start,
        connectedUsers: 0
    });
    promise.then(function() {
        vidId = ID;
        time = start;

        syncRoom(roomName);
    });
}

var vidId = 0;
var time = 0;

function fireGet(roomName) {
    return firebase.database().ref("Rooms/" + roomName).once('value').then(function(snapshot) {
        console.log("fireget...")
        time = snapshot.val().startTime;
        vidId = snapshot.val().videoLink;
        syncRoom(roomName);

    });
}

//Returns the names of all keys (roomnames) in the database)
var activeRooms = "";
var activeRoomsKeys;

function getActiveRooms() {
    return firebase.database().ref("Rooms").once('value').then(function(snapshot) {
        activeRooms = snapshot.val();
        activeRoomsKeys = Object.keys(activeRooms);
        console.log(Object.keys(activeRooms));
        console.log(Object.keys(activeRooms).length)
    });
}

function fireUpdate(roomName) {
    const promise = firebase.database().ref("Rooms/" + roomName).update({
        next: playlist
    })
    promise.then(function() {
        console.log('firebase playlist updated.');
    })
}



var connectedNumber; //temporary number
function pullConnectedNumber() {
    return firebase.database().ref("Rooms/" + room).once('value').then(function(snapshot) {
        //   console.log("pulling connectedNumber...")
        connectedNumber = snapshot.val().connectedUsers;
        console.log(connectedNumber);
        setConnectedRef();
    });

}

var connectedRef; //this is what the below function subscribes to in order to watch for a disconnect
function setConnectedRef() {
    console.log("ran setConnectedRef()...");
    connectedRef = firebase.database().ref("/Rooms/" + room + "/connectedUsers");
    connectedRef.set(connectedNumber + 1);
    connectedRef.onDisconnect().set(connectedNumber);

    connectedRef.on('value', function(snapshot) {
        //Add connected users element
        connectedNumber = snapshot.val();
        createConnectedElement();
    });
}

var counterExists = false;

function createConnectedElement() {
    var body = document.getElementsByTagName("body")[0];
    var counter = document.createElement("h2");
    if (counterExists) {
        var counterVar = document.getElementById("counter");
        counterVar.innerText = "Users: " + connectedNumber;
    } else {
        counter.innerText = "Users: " + connectedNumber;
        counter.id = "counter";
        body.appendChild(counter);
        counterExists = true;
    }

}

//sets the items in the join room tiles
function setTileButtons() {
    for (i = 0; i < activeRoomsKeys.length; i++) {
        var workingLiveTile = document.getElementsByClassName("tileButtons")[i];
        workingLiveTile.innerText = activeRoomsKeys[i];
    }
}