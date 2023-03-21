var apiKey = "AIzaSyBhw0ZTyW3oEATfX5jHxTzi-tAJDgH8r6A";
let playlistId;

var playlistData;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadPlaylist();
  },
  false
);

let playlist, selector, videoContainer, video;

function loadPlaylist() {
  // Make the API request

  playlist = document.getElementsByClassName("youtube-playlist")[0];
  playlistId = playlist.dataset.playlistId;
  selector = playlist.getElementsByClassName("youtube-playlist-selector")[0];
  videoContainer = playlist.getElementsByClassName("youtube-playlist-video")[0];

  video = document.createElement("div");

  videoContainer.appendChild(video);

  let apiUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  apiUrl += "?key=" + apiKey;
  apiUrl += "&playlistId=" + playlistId;
  apiUrl += "&part=snippet";
  apiUrl += "&maxResults=25";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      playlistData = data;
      populatePlaylist();
    });
}

function selectVideo(item) {
  if (item != activeItem) {
    player.loadVideoById(item.dataset.videoId);
    setActiveItem(item);
  }
}

function setActiveItem(item) {
  if (activeItem != null) activeItem.classList.remove("active");
  activeItem = item;
  activeItem.classList.add("active");
}

let selectorItems = [],
  activeItem;

function populatePlaylist() {
  for (let i = 0; i < playlistData.items.length; i++) {
    selectorItems[i] = document.createElement("div");
    if (i == 0) setActiveItem(selectorItems[i]);
    let itemImage = document.createElement("img");
    let videoData = playlistData.items[i];
    selectorItems[i].classList.add("youtube-playlist-item");
    itemImage.src = videoData.snippet.thumbnails.medium.url;
    selectorItems[i].addEventListener("click", () => {
      selectVideo(selectorItems[i]);
    });
    selectorItems[i].dataset.videoId = videoData.snippet.resourceId.videoId;
    selectorItems[i].appendChild(itemImage);
    selector.appendChild(selectorItems[i]);

    let itemOverlay = document.createElement("div");
    itemOverlay.classList.add("youtube-playlist-item-overlay");

    let overlayText = document.createElement("p");

    let itemTitle = videoData.snippet.title;
    if (itemTitle.includes("|")) {
      [, itemTitle] = itemTitle.split("|");
    }
    overlayText.innerHTML = itemTitle;
    itemOverlay.appendChild(overlayText);
    selectorItems[i].appendChild(itemOverlay);
  }

  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  console.log(video);
  player = new YT.Player(video, {
    videoId: playlistData.items[0].snippet.resourceId.videoId,
    playerVars: {
      playsinline: 1,
    },
    events: {},
    modestbranding: false,
  });
}
