var speed = 0.15;
var bg = document.querySelector("body");

document.onload = setBgPos();
window.addEventListener("scroll", setBgPos);

function setBgPos() {
    var distance = window.scrollY;
    bg.style.backgroundPositionY = (distance * speed * -1) + "px";
}
