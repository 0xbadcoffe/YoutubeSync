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
        startTime: start
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

var activeRooms = "";

function getActiveRooms() {
    return firebase.database().ref("Rooms").once('value').then(function(snapshot) {
        activeRooms = snapshot.val();
        console.log(Object.keys(activeRooms));
    });
}

//firebase user presence testing 

// function checkConnectedStatus() {
//     var connectedRef = firebase.database().ref(".info/connected");
//     connectedRef.on("value", function(snap) {
//         if (snap.val() === true) {
//             console.log(firebase.database().ref(".info/connected"));
//             alert("connected");
//         } else {
//             alert("not connected");
//         }
//     });
// }
function fireUpdate(roomName) {
    const promise = firebase.database().ref("Rooms/" + roomName).update({
        next: playlist
    })
    promise.then(function() {
        console.log('it works');
    })
}

var presenceRef;

function setPresenceRef() {
    presenceRef = firebase.database().ref("disconnectmessage");
    // Write a string when this client loses connection
    presenceRef.onDisconnect().set("I disconnected!");
}