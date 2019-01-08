if(localStorage && localStorage.getItem('cart')){
  var storedCart = JSON.parse(localStorage.getItem('cart')) //if user has a saved cart, import
}
window.onload = function() { //DOM loaded
  init();
}

function init(){
  console.log('init fired');  //initiate all functions that run in background
  try{
    startLetters();
  } catch (err) {}
  try{
    showSlides()
  } catch (err) {}
  try{
    readyCart()
  } catch (err) {}
}

function toggleMute(){
  var vid = document.getElementById("headerVideo");
  var but = document.getElementById("muteButton");
  if (vid.muted === true) { //unmute video
         vid.muted = false;
         but.src = "assets/unmute.png";
  } else { //mute video
      vid.muted = true;
      but.src = "assets/mute.png";
  }
}

function topFunction() {
  document.body.scrollTop = 0; //scroll up page when up arrow at bottom clicked
  document.documentElement.scrollTop = 0; //different browser support
}

var slideIndex = 0; //starting slide

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide"); //get all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";   //hide all slides
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1 //restart slideshow when it gets to end
  }    
  slides[slideIndex-1].style.display = "block"; //display the current slide
  setTimeout(showSlides, 9000); //change slide every 9 seconds
}

var shopSlideIndex = 1; //starting slide

function showShopSlides(n) {
  var i;
  var shopSlide = document.getElementById(modId).querySelectorAll(".shopSlide"); //get slides in open modal
 
  if (n > shopSlide.length) {shopSlideIndex = 1}
  if (n < 1) {shopSlideIndex = shopSlide.length}
  for (i = 0; i < shopSlide.length; i++) {
    shopSlide[i].style.display = "none"; //hide all slides
  }
  shopSlide[shopSlideIndex-1].style.display = "block"; //show current slide
}

function currentSlide(n) {
  showShopSlides(shopSlideIndex = n);
}

function showModal(modId) {
  window.modId = modId;
  window.modal = document.getElementById(modId);
  window.span = document.getElementsByClassName("close")[0];
  modal.style.display = "flex"; //display selected modal
}

function closeModal() {
  modal.style.display = "none"; //close modal when close button pressed
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"; //close modal when pressed outside of the modal
  }
}

function readyCart() {
  var removeCartItemButtons = document.getElementsByClassName('btnRemove') //import all remove from cart buttons
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem) //listen if remove from cart button is pressed
  }

  var quantityInputs = document.getElementsByClassName('cartQuantityInput') //import all quantity feilds
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged) //listen if quantity changed
  }

  var addToCartButtons = document.getElementsByClassName('btnAddCart') //import all add to cart buttons
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked) //listen if  add to cart pressed
  }
  var total = 0
  for (var i = 0; i < storedCart.length; i++) {
    addItemToCart(storedCart[i][0],storedCart[i][1],storedCart[i][3],storedCart[i][2]) //add items from local storage to cart
  }
  updateCartTotal()
  document.getElementsByClassName('btnPurchase')[0].addEventListener('click', purchaseClicked) //listen if purchase button pressed
}


function purchaseClicked() { //remove all items from cart and storage
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cartItems')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
  updateLocalStorage()
}

function removeCartItem(event) { //remove an item from the cart
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
  updateLocalStorage()
}

function quantityChanged(event) { //update values if quantity changed and prevent negative value from being entered
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
  updateLocalStorage()
}

function addToCartClicked(event) { //if add to cart pressed, gather all neccasary information and send to addToCart
  var button = event.target
  var shopItem = button.parentElement.parentElement.parentElement
  console.log(shopItem)
  var title = shopItem.getElementsByClassName('itemTitle')[0].innerText
  var price = shopItem.getElementsByClassName('itemPrice')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('itemPicture')[0].src
  addItemToCart(title, price, imageSrc, 1)
  updateCartTotal()
  updateLocalStorage()
}

function addItemToCart(title, price, imageSrc,qty) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cartRow')
  var cartItems = document.getElementsByClassName('cartItems')[0]
  var cartRows = cartItems.getElementsByClassName('cartRow')
  var cartItemNames = cartItems.getElementsByClassName('cartItemTitle')
  for (var i = 0; i < cartItemNames.length; i++) { //check if item already in the cart, if so just update quantity
      if (cartItemNames[i].innerText == title) {
          var quantityElement = cartRows[i].getElementsByClassName('cartQuantityInput')[0]
          quantityElement.value++
          return
      }
  }
  var cartRowContents = `
      <div class="cartItem cartColumn">
          <img class="cartItemImage" src="${imageSrc}">
          <span class="cartItemTitle">${title}</span>
      </div>
      <span class="cartPrice cartColumn">${price}</span>
      <div class="cartQuantity cartColumn">
          <input class="cartQuantityInput" type="number" value="${qty}">
          <button class="btn btnRemove" type="button">X</button>
      </div>` //if not already in cart create a new div with items info in and add to shop.html
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)

  cartRow.getElementsByClassName('btnRemove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cartQuantityInput')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cartItems')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cartRow')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cartPrice')[0]
      var quantityElement = cartRow.getElementsByClassName('cartQuantityInput')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity) // add up all items in cart prices
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cartTotalPrice')[0].innerText = '$' + total //set to total in shop.html
}

function updateLocalStorage() {
  var cartItemContainer = document.getElementsByClassName('cartItems')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cartRow')
  var total = 0
  storedCart = []
  for (var i = 0; i < cartRows.length; i++) { //if any changes made to cart, update the cart to feature all items, prices and quantiies
      var cartRow = cartRows[i]
      var title = cartRow.getElementsByClassName('cartItemTitle')[0].innerText
      var price = cartRow.getElementsByClassName('cartPrice')[0].innerText
      var imageSrc = cartRow.getElementsByClassName('cartItemImage')[0].src
      var quantityElement = cartRow.getElementsByClassName('cartQuantityInput')[0]
      var quantity = quantityElement.value
      storedCart.push([title, price, quantity, imageSrc])
  }
  localStorage.setItem('cart', JSON.stringify(storedCart)) //add to local storage
}

function startLetters() { //initialise letter bouncing DEMO on home page
  console.log('letters started')
  var canvas = document.getElementById("demoBounce");
  window.ctx = canvas.getContext('2d');
  canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
  window.width = canvas.width;
  window.height = canvas.height;
  window.letters = [];
  loop();
}

function random(min, max) { //returns random number between two specified numbers
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Letter(abc, x, y, velX, velY, color, size) { //letter class
  this.abc = abc; 
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Letter.prototype.draw = function() { //draw letters
  ctx.beginPath();
  ctx.font = "100px Arial"
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; 
  ctx.fillStyle = this.color;
  ctx.fillText(this.abc, this.x, this.y); 
}

Letter.prototype.update = function() { //updates letters speed and direction
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

Letter.prototype.collisionDetect = function() { //detect if letters collide, if so change their velocity accordingly
  for (var j = 0; j < letters.length; j++) {
    if (!(this === letters[j])) {
      var dx = this.x - letters[j].x;
      var dy = this.y - letters[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.size + letters[j].size) {

        letters[j].velX = -(letters[j].velX);
        letters[j].velY = -(letters[j].velY);
        this.velX = -(this.velX);
        this.velY = -(this.velY);
        letters[j].x += letters[j].velX;
        letters[j].y += letters[j].velY;
        this.x += this.velX;
        this.y += this.velY;
      }
      
    }
  }
}

function loop() { //always runs to constantly update letter position, detect colisions
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(0, 0, width, height);

  while (letters.length < 4) { //add the letters if not created
    var size = 35;
    var letter = new Letter("D", (1 + size), (height/2), random(-2,2), random(-2,2), 'rgb(237,32,45)', size);
    letters.push(letter);
    var letter = new Letter("E", ((width/2) - (size)), (height/2), random(-2,2), random(-2,2), 'rgb(0,175,216)', size);
    letters.push(letter);
    var letter = new Letter("M", ((width/2) + (size)), (height/2), random(-2,2), random(-2,2), 'rgb(245,222,67)', size);
    letters.push(letter);
    var letter = new Letter("O", (width - (1+size)), (height/2), random(-2,2), random(-2,2), 'rgb(237,32,45)', size);
    letters.push(letter);
  }

  for (var i = 0; i < letters.length; i++) {
    letters[i].draw();
    letters[i].update();
    letters[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}