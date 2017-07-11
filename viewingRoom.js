var tag = document.createElement('script');
tag.id = 'iframe';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoId = 'M7lc1UVf-VE';

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
    console.log("event fired");

    if (playerStatus == -1) {
        event.target.playVideo();
    } else if (playerStatus == 0) {

    } else if (playerStatus == 1) {

    } else if (playerStatus == 2) {
        event.target.playVideo();
    } else if (playerStatus == 3) {

    } else if (playerStatus == 5) {

    }

}

function syncRoom() {
    console.log(vidID);
    var currentTime = (new Date).getTime();
    var timeIntoVideo = Math.round((currentTime - time) / 1000);
    //document.getElementsByTagName('iframe')[0].src = "https://www.youtube.com/embed/" + vidID + "?enablejsapi=1&autoplay=1&start=" + timeIntoVideo;
}

function onPlayerStateChange(event) {
    eventFired(event.data);
}