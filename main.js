function loadImage(src, callback) {
  // Handler for loading images
  var image = new Image();
  image.onload = function() {
    callback(image);
  };
  image.src = src;
}

function drawEnvironment(callback) {
  // Create the canvas element
  var canvas = document.createElement('canvas');
  canvas.id = "game";
  canvas.width = 3392;
  canvas.height = 224;

  document.getElementById('scroll-wrapper').appendChild(canvas);

  var ctx = canvas.getContext('2d'),
      backgroundSource = 'assets/background.png';

  loadImage(backgroundSource, function(img) {
    ctx.drawImage(img, 0, 0);
  });
  
  callback();
}

function scrollBackground(x) {
  // Scrolls the wrapper to specified x value.
  var wrapper = document.getElementById('scroll-wrapper'),
      canvas = document.getElementById('game');

  // Beforehand, checks if wrapper will remain within the image.
  if (x >= 0 && x < canvas.width - wrapper.style.width)
    wrapper.scroll({
      left: x,
      behavior: 'smooth' // smooth scrolling
    });
}

window.addEventListener('load', function onWindowLoad() {
  drawEnvironment(function environmentCallback() {
    // Bind event for key presses once environment is loaded.
    document.addEventListener("keydown", handleKeyDown);
  });
});

function handleKeyDown(event) {
  var keys = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  };

  var wrapper = document.getElementById('scroll-wrapper');

  // Scroll background if left or right key is pressed.
  if (event.keyCode == keys.left) {
    scrollBackground(wrapper.scrollLeft - 10);
  }
  else if (event.keyCode == keys.right) {
    scrollBackground(wrapper.scrollLeft + 10);
  }
}

var coin, coinImg, coinObj;

function gameLoop () {
  window.requestAnimationFrame(gameLoop);
  
  coin.update();
  coin.render();
}

function coinSpr(options){
  var that = {},
	  frameIndex = 0,
	  tickCount = 0,
	  ticksPerFrame = options.ticksPerFrame || 0,
	  numberOfFrames = options.numberOfFrames || 1;
  
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.loop = options.loop;
  
  that.update = function(){
	tickCount += 1;
	
	if (tickCount > ticksPerFrame){
	  tickCount = 0;
	  
	  // If the current frame index is in range
      if (frameIndex < numberOfFrames - 1) {
	    //go to the next frame
	    frameIndex += 1;
	  } else{
	    frameIndex = 0;
	  }
    }
  }
  
  
  that.render = function(){
	
	// Clear the canvas
    that.context.clearRect(0, 0, that.width, that.height);
	
	// draw the animation
	that.context.drawImage(
	  that.image, 
	  frameIndex * that.width / numberOfFrames, 
	  112, 
	  that.width / numberOfFrames, 
	  that.height, 
	  0, 
	  0, 
	  that.width / numberOfFrames, 
	  that.height)
  }
  return that;
}

//get coin canvas
coinObj = document.getElementById("coinAnimation");
coinObj.width = 16;
coinObj.height = 16;

//create coin sprite sheet
coinImg = new Image();

//create coin sprite
coin = coinSpr({
  context: coinObj.getContext("2d"),
  width: 64,
  height: 16,
  image: coinImg,
  numberOfFrames: 4,
  ticksPerFrame: 4
}); 

//load coin sprite sheet
coinImg.src = "assets/items&Objects.png";

// Start the game loop as soon as the sprite sheet is loaded
coinImg.addEventListener("load", gameLoop);