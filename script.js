window.onload = function() {
  init();
}
function init(){
  console.log('init fired');
  
} 
//var button = document.getElementById('muteButton');
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