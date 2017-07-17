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


function syncRoom(roomName) {
    var currentTime = (new Date).getTime();
    var timeIntoVideo = ((currentTime - time) / 1000);
    player.cueVideoById(vidId, timeIntoVideo);
    document.getElementById('iframe').style.display = 'block';
    player.playVideo();
    var ytPlayer = document.getElementById("iframe");
    var roomTitle = document.createElement("h2");
    roomTitle.innerText = "Room: " + roomName;
    ytPlayer.parentElement.insertBefore(roomTitle, ytPlayer);
    var body = document.getElementsByTagName("body")[0];

}

function onPlayerStateChange(event) {
    eventFired(event.data);
}