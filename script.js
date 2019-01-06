window.onload = function() { // DOM loaded
  init();
}

function init(){
  console.log('init fired');
  showSlides();
} 

function toggleMute(){
  var vid = document.getElementById("headerVideo");
  var but = document.getElementById("muteButton");
  if (vid.muted === true) { // Unmute video
         vid.muted = false;
         but.src = "assets/unmute.png";
  } else { // Mute video
      vid.muted = true;
      but.src = "assets/mute.png";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var slideIndex = 0;

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 9000); // Change slide every 9 seconds
}
