window.onload = function() { // DOM loaded
  init();
}

function init(){
  console.log('init fired');
  startLetters();
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

function startLetters() {
  var canvas = document.getElementById("demoBounce");
  window.ctx = canvas.getContext('2d');
  canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
  window.width = canvas.width;
  window.height = canvas.height;
  window.letters = [];
  loop();
}

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Letter(abc, x, y, velX, velY, color, size) {
  this.abc = abc; 
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Letter.prototype.draw = function() {
  ctx.beginPath();
  ctx.font = "100px Arial"
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; 
  ctx.fillStyle = this.color;
  ctx.fillText(this.abc, this.x, this.y);
}

Letter.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

Letter.prototype.collisionDetect = function() {
  for (var j = 0; j < letters.length; j++) {
    if (!(this === letters[j])) {
      var dx = this.x - letters[j].x;
      var dy = this.y - letters[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.size + letters[j].size) {
        this.velX = -(this.velX);
        this.velY = -(this.velY);
        this.x += this.velX;
        this.y += this.velY;
      }
      
    }
  }
}

function loop() {
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(0, 0, width, height);

  while (letters.length < 4) {
    var size = 30;
    var letter = new Letter("D", (1 + size), (height/2), 1, 1, 'rgb(237,32,45)', size);
    letters.push(letter);
    var letter = new Letter("E", ((width/2) - (size)), (height/2), -1, 1, 'rgb(0,175,216)', size);
    letters.push(letter);
    var letter = new Letter("M", ((width/2) + (size)), (height/2), 1, -1, 'rgb(245,222,67)', size);
    letters.push(letter);
    var letter = new Letter("O", (width - (1+size)), (height/2), -1, -1, 'rgb(237,32,45)', size);
    letters.push(letter);
  }

  for (var i = 0; i < letters.length; i++) {
    letters[i].draw();
    letters[i].update();
    letters[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}