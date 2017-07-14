var tag = document.createElement('script');
tag.id = 'iframe';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoId = '';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('iframe', {
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function eventFired(playerStatus) {
    // console.log("event fired");

    if (playerStatus == -1) {
        //event.target.playVideo();
    } else if (playerStatus == 0) {

    } else if (playerStatus == 1) {

    } else if (playerStatus == 2) {
        //event.target.playVideo();
    } else if (playerStatus == 3) {

    } else if (playerStatus == 5) {

    }

}

function make(roomName) {
    var ytPlayer = document.getElementById("iframe");
    var roomTitle = document.createElement("h2");
    roomTitle.innerText = "Room: " + roomName;
    ytPlayer.parentElement.insertBefore(roomTitle, ytPlayer);
    var newButton = document.createElement("button");
    var button2 = document.createElement('button');
    var table = document.createElement("table");
    var newrow = document.createElement('tr');
    var upNext = document.createElement('th');
    var idCol = document.createElement('th');
    var cancel = document.createElement('button');
    table.id = "playlist";
    newButton.id = "addToPlaylist";
    button2.id = "add";
    cancel.id = "cancel";
    cancel.innerText = "Cancel";
    newButton.innerText = "Add to Playlist";
    button2.innerText = "Add";
    button2.style.display = 'none';
    cancel.style.display = 'none';
    newButton.className = "buttons1";
    button2.className = 'buttons1';
    newButton.addEventListener("click", () => {
        // document.getElementsByTagName('table')[0].style.display = 'table';
        document.getElementById('addToPlaylist').style.display = 'none';
        document.getElementById('add').style.display = 'inline-block';
        document.getElementById('forms').style.display = 'table-row';
    });
    button2.addEventListener("click", () => {
        var name = document.getElementById('nameinput').value;
        var id = document.getElementById('idinput').value;
        if (name == "" || id == "") {
            alert("Please make sure that both the name and ID fields are completed");
            return;
        } else {
            document.getElementById('addToPlaylist').style.display = 'inline-block';
            document.getElementById('add').style.display = 'none';
            document.getElementById('forms').style.display = 'none';
            document.getElementById('nameinput').value = '';
            document.getElementById('idinput').value = '';
            var newListItem = document.createElement('tr');
            var itemName = document.createElement('td');
            var itemID = document.createElement('td');
            itemID.innerText = id;
            itemName.innerText = name;
            newListItem.appendChild(itemName);
            newListItem.appendChild(itemID);
            var table = document.getElementsByTagName('table')[0];
            table.insertBefore(newListItem, table.lastChild);
        }
    });

    cancel.addEventListener("click", () => {
        document.getElementById('addToPlaylist').style.display = 'inline-block';
        document.getElementById('add').style.display = 'none';
        document.getElementById('forms').style.display = 'none';
        document.getElementById('nameinput').value = '';
        document.getElementById('idinput').value = '';
    });

    newButton.style.marginTop = "20px";
    var container = ytPlayer.parentElement;
    container.insertBefore(newButton, container.lastChild);
    container.insertBefore(cancel, container.lastChild);
    idCol.innerText = "ID's"
    upNext.innerText = "Up Next"
    newrow.appendChild(upNext);
    newrow.appendChild(idCol);
    table.appendChild(newrow);
    container.insertBefore(table, newButton);
    container.insertBefore(button2, container.lastChild);
    var nameinput = document.createElement('input');
    var idinput = document.createElement('input');
    nameinput.placeholder = "name";
    idinput.placeholder = "video id";
    nameinput.id = "nameinput";
    idinput.id = "idinput";
    nameinput.className = 'inputs1';
    idinput.className = 'inputs1';
    newrow = document.createElement('tr');
    var namecell = document.createElement('td');
    var idcell = document.createElement('td');
    newrow.id = 'forms';
    namecell.insertAdjacentElement("afterbegin", nameinput);
    idcell.insertAdjacentElement("afterbegin", idinput);
    newrow.appendChild(namecell);
    newrow.appendChild(idcell);
    table.appendChild(newrow);
    newrow.style.display = 'none';
    table.style.display = 'table';
}


function syncRoom(roomName) {
    var currentTime = (new Date).getTime();
    var timeIntoVideo = ((currentTime - time) / 1000);
    player.cueVideoById(vidId, timeIntoVideo);
    document.getElementById('iframe').style.display = 'block';
    player.playVideo();
    make(roomName);

    //body.appendChild(roomTitle);
    // event.target.playVideo();
    //document.getElementsByTagName('iframe')[0].src = "https://www.youtube.com/embed/" + vidID + "?enablejsapi=1&autoplay=1&start=" + timeIntoVideo;
}

function onPlayerStateChange(event) {
    eventFired(event.data);
}