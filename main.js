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
