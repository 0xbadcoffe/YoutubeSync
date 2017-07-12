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


function syncRoom() {
    var currentTime = (new Date).getTime();
    var timeIntoVideo = ((currentTime - time) / 1000);
    player.cueVideoById(vidId, timeIntoVideo);
    document.getElementById('iframe').style.display = 'block';
    player.playVideo();
    // event.target.playVideo();
    //document.getElementsByTagName('iframe')[0].src = "https://www.youtube.com/embed/" + vidID + "?enablejsapi=1&autoplay=1&start=" + timeIntoVideo;
}

function onPlayerStateChange(event) {
    eventFired(event.data);
}