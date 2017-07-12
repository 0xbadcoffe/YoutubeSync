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
            console.log('error', this.error);
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
    })
}


$(function() {
    bootstrap();
});

function fireSet(roomName, ID, start) {
    const promise = firebase.database().ref(roomName).set({
        videoLink: ID,
        startTime: start
    });
    promise.then(function() {
        syncRoom();
    });
}

var vidId = '';
var time = '';

function fireGet(roomName) {
    return firebase.database().ref(roomName).once('value').then(function(snapshot) {
        time = snapshot.val().startTime;
        vidId = snapshot.val().videoLink;
        syncRoom();
    });
}