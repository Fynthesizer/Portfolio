document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var currentTrack = 0;
var player;
var tracklist;
var art;
var title;
var canvas, ctx, audioCtx, analyser, source, data;

var tracks = [
    {
        "title": "Enchanted Forest",
        "audio": "/audio/enchantedforest.mp3",
        "art": null,
        "genre": "Orchestral"
    },
    {
        "title": "Angry Peaches",
        "audio": "/audio/angrypeaches.mp3",
        "art": "/images/angrypeaches.png",
        "genre": "Chiptune-Metal"
    },
    {
        "title": "Equine - Main Theme",
        "audio": "/audio/equine.mp3",
        "art": "/images/equine.png",
        "genre": "Orchestral"
    },
    {
        "title": "Crime of Slashin'",
        "audio": "/audio/crimeofslashin.mp3",
        "art": null,
        "genre": "Darksynth"
    },
    {
        "title": "Trigger Witch - The Good, the Bad",
        "audio": "/audio/thegoodthebad.mp3",
        "art": "/images/triggerwitch.png",
        "genre": "16-Bit Western"
    },
    {
        "title": "Trigger Witch - The Ugly",
        "audio": "/audio/theugly.mp3",
        "art": "/images/triggerwitch.png",
        "genre": "Western Metal"
    },
    {
        "title": "Showdown",
        "audio": "/audio/showdown.mp3",
        "art": null,
        "genre": "Synthwave"
    },
    {
        "title": "Space Pingaz",
        "audio": "/audio/spaceorgy.mp3",
        "art": null,
        "genre": "Funky House"
    },
    {
        "title": "Stranded - Figment",
        "audio": "/audio/figment.mp3",
        "art": "/images/stranded.png",
        "genre": "Ambient"
    },
    {
        "title": "Reoriention Week - RE4",
        "audio": "/audio/reo.mp3",
        "art": "/images/reorientationweek.png",
        "genre": "Synthwave"
    },
    {
        "title": "Ancient Mystery",
        "audio": "/audio/ancientmystery.mp3",
        "art": null,
        "genre": "Hybrid Orchestral"
    },
    {
        "title": "Equine - Anara",
        "audio": "/audio/anara.mp3",
        "art": "/images/equine.png",
        "genre": "Orchestral"
    }
]

var defaultArt = "/images/self portrait_underlay.png";

function startplayer() 
{
    player = document.getElementById('mp-audio');
    player.controls = false;
    player.addEventListener("timeupdate",updateUI);
    player.addEventListener("canplaythrough",updateUI);
    player.addEventListener("canplaythrough", trackLoaded);
}

function play_aud() 
{
    let btn = document.getElementById('mp-play');
    if(player.paused) {
        player.play();
        btn.classList.replace('fa-play', 'fa-pause');
    }
    else {
        player.pause();
        btn.classList.replace('fa-pause', 'fa-play');
    }
} 

function pause_aud() 
{
 player.pause();
}

function stop_aud() 
{
 player.pause();
 player.currentTime = 0;
}

function change_vol()
{
 player.volume=document.getElementById("mp-volslider").value;
}

function change_pos()
{
 player.currentTime = player.duration * document.getElementById("mp-seekbar").value;
}

function updateUI(){
    document.getElementById("mp-seekbar").value = player.currentTime / player.duration;
    document.getElementById("mp-currenttime").innerHTML = fmtMSS(Math.round(player.currentTime));
    //document.getElementById("mp-length").innerHTML = fmtMSS(Math.round(player.duration));
    let btn = document.getElementById('mp-play');
    if(player.paused) btn.classList.replace('fa-pause', 'fa-play');
    else btn.classList.replace('fa-play', 'fa-pause');
}

function trackLoaded(){
    document.getElementById("mp-seekbar").value = player.currentTime / player.duration;
    document.getElementById("mp-currenttime").innerHTML = fmtMSS(Math.round(player.currentTime));
    document.getElementById("mp-length").innerHTML = fmtMSS(Math.round(player.duration));
    if(tracks[currentTrack].art != null) art.src = tracks[currentTrack].art;
    else art.src = defaultArt;
    title.innerHTML = tracks[currentTrack].title;
    //player.currentTime = 0;
}

function populateTracklist(){
    for (let i = 0; i < tracks.length; i++) {
        var track = document.createElement('li');
        track.innerHTML = tracks[i].title;
        track.addEventListener("click", function(){
            changeTrack(i);
            player.play();
        })
        var trackGenre = document.createElement('span');
        trackGenre.innerHTML = tracks[i].genre;
        trackGenre.className = "track-genre";
        track.appendChild(trackGenre);

        // Add it to the list:
        tracklist.appendChild(track);
    }
}

function changeTrack(trackNum){
    currentTrack = trackNum;
    player.src = tracks[trackNum].audio;
    let tracklistItem = tracklist.children[trackNum];
    var current = tracklist.getElementsByClassName("active");
    if(current.length > 0) current[0].className = "";
    tracklistItem.className += "active";
}

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s};

$(document).ready(function() {
    tracklist = document.getElementById('mp-tracklist');
    art = document.getElementById('mp-art');
    title = document.getElementById('mp-title');
    
    canvas = document.getElementById('mp-visualiser');
    if(canvas != undefined){
        ctx = canvas.getContext("2d");
        ctx.canvas.width = canvas.width;
        ctx.canvas.height = canvas.height;
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source = audioCtx.createMediaElementSource(player);
        source.connect(analyser);
        source.connect(audioCtx.destination);
        data = new Uint8Array(analyser.frequencyBinCount);
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);


        window.addEventListener('resize', resizeCanvas, false);
    }
    
    populateTracklist();
    changeTrack(0);
});

function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    var x = 0;
    var bufferLength = analyser.frequencyBinCount;
    
    var barWidth = (canvas.width / bufferLength) * 2;
    for (var i = 0; i < bufferLength; i++) {
        var barHeight = data[i]/2;
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

function resizeCanvas(){
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
}