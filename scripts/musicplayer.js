document.addEventListener(
  "DOMContentLoaded",
  function () {
    startplayer();
  },
  false
);
var currentTrack = 0;
var audio;
var player;
var tracklist;
var art;
var title;
var album;
var canvas, ctx, audioCtx, analyser, source, data;

var albums = [
  {
    albumID: "showreel",
    tracks: [
      {
        title: "Wildermon - Battle",
        audio: "/audio/Wildermon_Battle.mp3",
        art: "/images/trackart/wildermon.png",
        genre: "Orchestral",
      },
      {
        title: "The Garden of Ora - Spring",
        audio: "/audio/goo_spring.mp3",
        art: "/images/thegardenofora/thumbnail.png",
        genre: "Ambient",
      },
      {
        title: "The Garden of Ora - Winter",
        audio: "/audio/goo_winter.mp3",
        art: "/images/thegardenofora/thumbnail.png",
        genre: "Ambient",
      },
      {
        title: "The Slumberous Swamp",
        audio: "/audio/grottygrotto.mp3",
        art: null,
        genre: "Orchestral",
      },
      {
        title: "The Beginning of a Grand Adventure",
        audio: "/audio/grandadventure.mp3",
        art: null,
        genre: "Orchestral",
      },
      /*
      {
        title: "Forest Sprites",
        audio: "/audio/enchantedforest.mp3",
        art: "/images/trackart/enchantedforest.png",
        genre: "Orchestral",
      },
      */

      {
        title: "Trigger Witch - The Good, the Bad",
        audio: "/audio/thegoodthebad.mp3",
        art: "/images/triggerwitch.png",
        genre: "16-Bit",
      },
      {
        title: "Trigger Witch - The Ugly",
        audio: "/audio/theugly.mp3",
        art: "/images/triggerwitch.png",
        genre: "Synth Metal",
      },
      {
        title: "Trigger Witch - Floating in the Clouds",
        audio: "/audio/skypavillion_light.mp3",
        art: "/images/triggerwitch.png",
        genre: "16-Bit",
      },
      {
        title: "Trigger Witch - Soaring Through the Sky",
        audio: "/audio/skypavillion_heavy.mp3",
        art: "/images/triggerwitch.png",
        genre: "Synth Metal",
      },
      {
        title: "Trigger Witch - Poltergeist Prince",
        audio: "/audio/poltergeistprince.mp3",
        art: "/images/triggerwitch.png",
        genre: "Synth Metal",
      },
      {
        title: "Leaving the City",
        audio: "/audio/leavingthecity.mp3",
        art: "/images/trackart/synthwave.png",
        genre: "Synthwave",
      },
      {
        title: "Showdown",
        audio: "/audio/showdown.mp3",
        art: "/images/trackart/synthwave.png",
        genre: "Synthwave",
      },
      {
        title: "110 km/h",
        audio: "/audio/slowitdown.mp3",
        art: "/images/trackart/synthwave.png",
        genre: "Synthwave",
      },
      /*
      {
        title: "Crime of Slashin'",
        audio: "/audio/crimeofslashin.mp3",
        art: "/images/trackart/synthwave.png",
        genre: "Synthwave",
      },
      */
      {
        title: "Equine - Main Theme",
        audio: "/audio/equine.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Equine - Anara",
        audio: "/audio/anara.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Equine - Cornelius",
        audio: "/audio/cornelius.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Equine - Rocky",
        audio: "/audio/rocky.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },

      /*
  {
    title: "Equine - Main Menu",
    audio: "/audio/equinemenu.mp3",
    art: "/images/equine.png",
    genre: "Orchestral",
  },
  */
      {
        title: "Lifeforms",
        audio: "/audio/lifeforms.mp3",
        art: "/images/trackart/lifeforms.jpg",
        genre: "Electronic",
      },
      {
        title: "Undersea Jamboree",
        audio: "/audio/spaceorgy.mp3",
        art: "/images/trackart/lifeforms.jpg",
        genre: "Electronic",
      },
      /*
      {
        title: "Ancient Mystery",
        audio: "/audio/ancientmystery.mp3",
        art: "/images/trackart/ancientmystery.png",
        genre: "Hybrid Orchestral",
      },
      */
      /*
      {
        title: "Flutterby",
        audio: "/audio/flutterby.mp3",
        art: "/images/flutterby.png",
        genre: "Orchestral",
      },
      */
      {
        title: "Stranded - Figment",
        audio: "/audio/figment.mp3",
        art: "/images/stranded.png",
        genre: "Ambient",
      },
      /*
      {
        title: "Kaitiaki Harvest",
        audio: "/audio/kaitiakiharvest.mp3",
        art: "/images/kaitiakiharvest.png",
        genre: "16-Bit Ambient",
      },
      
      {
        title: "Angry Peaches",
        audio: "/audio/angrypeaches.mp3",
        art: "/images/angrypeaches.png",
        genre: "Chiptune-Metal",
      },
      */
    ],
  },
  {
    albumID: "equine",
    tracks: [
      {
        title: "Main Theme",
        audio: "/audio/equine/equine.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Race",
        audio: "/audio/equine/defaultrace.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Anara",
        audio: "/audio/equine/anara.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Cornelius",
        audio: "/audio/equine/cornelius.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Rocky",
        audio: "/audio/equine/rocky.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Malik",
        audio: "/audio/equine/malik.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Lizzie",
        audio: "/audio/equine/lizzie.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Fei",
        audio: "/audio/equine/fei.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Guerrero",
        audio: "/audio/equine/guerrero.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Jules",
        audio: "/audio/equine/jules.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "River",
        audio: "/audio/equine/river.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Yukio",
        audio: "/audio/equine/yukio.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
      {
        title: "Main Menu",
        audio: "/audio/equine/menu.mp3",
        art: "/images/equine.png",
        genre: "Orchestral",
      },
    ],
  },
];

var defaultArt = "/images/self portrait_underlay.png";

function startplayer() {
  audio = document.getElementById("mp-audio");
  audio.controls = false;
  audio.addEventListener("timeupdate", updateUI);
  audio.addEventListener("canplaythrough", updateUI);
  audio.addEventListener("canplaythrough", trackLoaded);
  audio.addEventListener("ended", next);
}

function play_aud() {
  let btn = document.getElementById("mp-play");
  if (audio.paused) {
    audio.play();
    btn.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    btn.classList.replace("fa-pause", "fa-play");
  }
}

function pause_aud() {
  audio.pause();
}

function stop_aud() {
  audio.pause();
  audio.currentTime = 0;
}

function next() {
  if (currentTrack < album.tracks.length - 1) changeTrack(currentTrack + 1);
  else changeTrack(0);
  audio.play();
}

function previous() {
  if (currentTrack > 0) changeTrack(currentTrack - 1);
  else changeTrack(album.tracks.length - 1);
  audio.play();
}

function change_vol() {
  audio.volume = document.getElementById("mp-volslider").value;
}

function change_pos() {
  audio.currentTime =
    audio.duration * document.getElementById("mp-seekbar").value;
}

function updateUI() {
  if (audio.readyState > 1)
    document.getElementById("mp-seekbar").value =
      audio.currentTime / audio.duration;
  document.getElementById("mp-currenttime").innerHTML = fmtMSS(
    Math.round(audio.currentTime)
  );
  //document.getElementById("mp-length").innerHTML = fmtMSS(Math.round(player.duration));
  let btn = document.getElementById("mp-play");
  if (audio.paused) btn.classList.replace("fa-pause", "fa-play");
  else btn.classList.replace("fa-play", "fa-pause");
}

function trackLoaded() {
  document.getElementById("mp-seekbar").value =
    audio.currentTime / audio.duration;
  document.getElementById("mp-currenttime").innerHTML = fmtMSS(
    Math.round(audio.currentTime)
  );
  document.getElementById("mp-length").innerHTML = fmtMSS(
    Math.round(audio.duration)
  );
  if (album.tracks[currentTrack].art != null)
    art.src = album.tracks[currentTrack].art;
  else art.src = defaultArt;
  title.innerHTML = album.tracks[currentTrack].title;
  //player.currentTime = 0;
}

function populateTracklist(album) {
  for (let i = 0; i < album.tracks.length; i++) {
    var track = document.createElement("li");
    track.innerHTML = album.tracks[i].title;
    track.addEventListener("click", function () {
      changeTrack(i);
      audio.play();
    });
    var trackGenre = document.createElement("span");
    trackGenre.innerHTML = album.tracks[i].genre;
    trackGenre.className = "track-genre";
    track.appendChild(trackGenre);

    // Add it to the list:
    tracklist.appendChild(track);
  }
}

function changeTrack(trackNum) {
  currentTrack = trackNum;
  document.getElementById("mp-seekbar").value = 0;
  audio.src = album.tracks[trackNum].audio;
  let tracklistItem = tracklist.children[trackNum];
  var current = tracklist.getElementsByClassName("active");
  if (current.length > 0) current[0].className = "";
  tracklistItem.className += "active";
}

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

$(document).ready(function () {
  tracklist = document.getElementById("mp-tracklist");
  art = document.getElementById("mp-art");
  title = document.getElementById("mp-title");
  player = document.getElementById("music-player");

  canvas = document.getElementById("mp-visualiser");
  if (canvas != undefined) {
    ctx = canvas.getContext("2d");
    ctx.canvas.width = canvas.width;
    ctx.canvas.height = canvas.height;
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(audioCtx.destination);
    data = new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);

    window.addEventListener("resize", resizeCanvas, false);
  }

  album = albums.find((element) => element.albumID == player.dataset.albumId);

  populateTracklist(album);
  changeTrack(0);
});

function loopingFunction() {
  requestAnimationFrame(loopingFunction);
  analyser.getByteFrequencyData(data);
  draw(data);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let space = canvas.width / data.length;
  var x = 0;
  var bufferLength = analyser.frequencyBinCount;

  var barWidth = (canvas.width / bufferLength) * 2;
  for (var i = 0; i < bufferLength; i++) {
    var barHeight = data[i] / 2;
    //ctx.strokeStyle = "#ffffff";
    //ctx.beginPath();
    //ctx.moveTo(space * i, canvas.height); //x,y
    //ctx.lineTo(space * i, canvas.height - value); //x,y
    //ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }
}

function resizeCanvas() {
  ctx.canvas.width = canvas.clientWidth;
  ctx.canvas.height = canvas.clientHeight;
}
