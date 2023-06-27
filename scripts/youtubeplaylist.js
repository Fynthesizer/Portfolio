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

let carousel, videoContainer, video;

function loadPlaylist() {
  // Make the API request

  carousel = document.getElementsByClassName("youtube-playlist")[0];
  playlistId = carousel.dataset.playlistId;

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
      playlistData = data;
      console.log(playlistData);
      populatePlaylist();
    });
}

let slides = [];

function populatePlaylist() {
  for (let i = 0; i < playlistData.items.length; i++) {
    slides[i] = document.createElement("li");
    let slideContainer = document.createElement("div");
    slideContainer.classList.add("splide__slide__container");
    let thumbnail = document.createElement("img");
    let videoData = playlistData.items[i];
    slides[i].classList.add("splide__slide");
    slides[i].setAttribute(
      "data-splide-youtube",
      "https://www.youtube.com/watch?v=" + videoData.snippet.resourceId.videoId
    );
    thumbnail.src = videoData.snippet.thumbnails.maxres.url;
    slideContainer.appendChild(thumbnail);
    slides[i].appendChild(slideContainer);

    carousel.appendChild(slides[i]);

    let titleText = document.createElement("h3");

    let itemTitle = videoData.snippet.title;
    if (itemTitle.includes("|")) {
      [, itemTitle] = itemTitle.split("|");
    }
    titleText.innerHTML = itemTitle;
    slides[i].appendChild(titleText);
  }

  var redesignSplide = new Splide("#redesign-carousel", {
    type: "loop",
    fixedWidth: "500px",
    focus: "center",
    drag: true,
    flickMaxPages: "0.5",
    video: {
      mute: false,
      playerOptions: {
        youtube: { autoplay: false },
        vimeo: {},
        htmlVideo: {},
      },
    },
  });
  redesignSplide.mount(window.splide.Extensions);
}
