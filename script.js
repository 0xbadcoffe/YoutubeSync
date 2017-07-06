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


// //global vars
// var body = document.getElementsByTagName('body')[0];

// //Main homepage

// function welcomeButtonsPressed() {
//     var div = document.createElement("div");
//     div.id = "roomBox"

//     var joinRoomButton = document.createElement("button")
//     joinRoomButton.innerText = "Join a Room";
//     joinRoomButton.onclick = clearAll;
//     joinRoomButton.className = "buttons1";
//     joinRoomButton.id = "joinroombutton";

//     var createRoomButton = document.createElement("button");
//     createRoomButton.innerText = "Create a Room";
//     createRoomButton.className = "buttons1";
//     createRoomButton.onclick = clearAll;
//     createRoomButton.id = "createroombutton";

//     var welcomeBanner = document.createElement("h1");
//     welcomeBanner.innerText = "Welcome";
//     welcomeBanner.className = "welcome";

//     div.appendChild(welcomeBanner);
//     div.appendChild(createRoomButton);
//     div.appendChild(joinRoomButton);

//     document.getElementsByTagName('body')[0].appendChild(div);
// }


// function clearAll() {
//     var sender = this.id;
//     body.innerHTML = "";
//     var logo = document.createElement("h1");
//     logo.innerText = "DJSync";
//     body.appendChild(logo);



//     switch (sender) {
//         case ("createroombutton"):
//             //console.log(sender + " was pressed");
//             createRoom();
//             break;
//         case ("joinroombutton"):
//             // console.log(sender + " was pressed");
//             joinRoom();
//             break;
//         default:
//             //console.log(sender);
//             break;
//     }

// }

// function createRoom() {
//     var div = document.createElement("div");
//     div.id = "roomBox"

//     var createTitle = document.createElement("h1");
//     createTitle.className = "createTitle";
//     createTitle.innerText = "Enter a Room Name"

//     var input = document.createElement("input");
//     input.placeholder = "case sensitive!";
//     input.className = "inputs1";

//     var createButton = document.createElement("button");
//     createButton.className = "buttons1";
//     createButton.innerText = "Launch";
//     createButton.style.marginTop = "20px";
//     createButton.onclick = "";


//     div.appendChild(createTitle);
//     div.appendChild(input);
//     div.appendChild(createButton);
//     div.style.height = "220px"

//     document.getElementsByTagName('body')[0].appendChild(div);
// }

// function joinRoom() {
//     var div = document.createElement("div");
//     div.id = "roomBox"

// }

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
        case 'test':
            onSomeBtnClicked();
            break;
        case 'test1':
            $('#testBtn').on('click', () => {
                goBack();
            });
            break;
    }
}

// Function called when the app initializes 
function bootstrap() {
    console.log('YoutubeSync Bootstrapping...');
    firebaseInit();
    appendTemplate('test');
}

function onSomeBtnClicked() {
    $('#someBtn').on('click', () => {
        appendTemplate('test1');
    });
}

$(function() {
    bootstrap();
});