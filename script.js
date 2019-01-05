window.onload = function() {
  init();
  showSlides();
}
function init(){
  console.log('init fired');
} 
function toggleMute(){
  var vid = document.getElementById("headerVideo");
  var but = document.getElementById("muteButton")
  if (vid.muted === true) {    
         vid.muted = false;
         but.src = "assets/unmute.png"
  } else {
      vid.muted = true;
      but.src = "assets/mute.png"
  }
};

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var slideIndex = 0;
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 9000); // Change image every 2 seconds
}