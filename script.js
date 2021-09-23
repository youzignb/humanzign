//get element id for the frame and call it canvas so we can manipulate it in JS
const canvas = document.getElementById("canvas");

//create the 2d context for canvas
const ctx = canvas.getContext("2d");

// write hello world
ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillText("Hello World", 250, 15);

//draw head
var head = document.getElementById("head1").src;

//draw body
var body = document.getElementById("body1").src;

//draw feet
var feet = document.getElementById("feet1").src;

updateCanvas();

//ADDHEAD define the function that adds an image at a particular position
function addImage(src, x, y, w, h) {
  let image = new Image();
  image.src = src;
  image.onload = function () {
    ctx.drawImage(image, x, y, w, h); //draw image
  };
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  addImage(head, 155, 30, 200, 200);
  addImage(body, 50, 210, 400, 400);
  addImage(feet, -50, 470, 600, 420);
}

// when clicking on head2, load head2 on canvas
document.getElementById("head2").addEventListener("click", function () {
  head = "/images/head/head2.png";
  updateCanvas();
});

// when clicking on head1, load head1 on canvas
//not pretty, image sizes need to be adjusted
document.getElementById("head1").addEventListener("click", function () {
  head = "/images/head/head1.png";
  updateCanvas();
});

// when clicking on head3, load head3 on canvas
//not pretty, image sizes need to be adjusted
document.getElementById("head3").addEventListener("click", function () {
  head = "/images/head/head3.png";
  updateCanvas();
});

///BODY

// when clicking on body1, load body1 on canvas
document.getElementById("body1").addEventListener("click", function () {
  body = "/images/body/body1.png";
  updateCanvas();
});

// when clicking on body2, load body2 on canvas
document.getElementById("body2").addEventListener("click", function () {
  body = "/images/body/body2.png";
  updateCanvas();
});

// when clicking on body3, load body3 on canvas
document.getElementById("body3").addEventListener("click", function () {
  body = "/images/body/body3.png";
  updateCanvas();
});
