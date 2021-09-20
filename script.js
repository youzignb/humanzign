console.log("hello world");

//get element id for the frame and call it canvas so we can manipulate it in JS
const canvas = document.getElementById("canvas");

//create the 2d context for canvas
const ctx = canvas.getContext("2d");

// write hello world
ctx.font = "30px Arial";
ctx.textAlign = "center";
ctx.fillText("Hello World", 250, 30);

//wait for page to load then add the default image to the canvas
window.onload = function() {
    const canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //draw head
    var head = document.getElementById("head1");
    ctx.drawImage(head, 155, 30, 200, 200);

    //draw body
    var body = document.getElementById("body1");
    ctx.drawImage(body, 50, 210, 400, 400);

    //draw feet
    var feet = document.getElementById("feet1");
    ctx.drawImage(feet, -50, 470, 600, 420);
};

//ADDHEAD define the function that adds an image at a particular position
function addHead(src, x, y,w,h) {
    let image = new Image();
    image.src = src;
    image.onload = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(150,40,210,188); //clear the canvas by drawing a rectangle
        ctx.drawImage(image, x, y,w,h); //draw image
    }
}

//ADDBODY define the function that adds an image at a particular position
function addBody(src, x, y,w,h) {
    let image = new Image();
    image.src = src;
    image.onload = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(50,218,400,392); //clear the canvas by drawing a rectangle
        ctx.drawImage(image, x, y,w,h); //draw image
    }
}

// //BUGGY ADDFEET define the function that adds an image at a particular position
// function addFeet(src, x, y,w,h) {
//     let image = new Image();
//     image.src = src;
//     image.onload = function() {
//         ctx.fillStyle = "red";
//         ctx.fillRect(-50, 470, 600, 420); //clear the canvas by drawing a rectangle
//         ctx.drawImage(image, x, y,w,h); //draw image
//     }
// }

//createHead: pass the attributes for addHead to the createHead function
function createHead() {
    addHead(head, 155, 30,200,200);
}

//createBody: pass the attributes for addBody to the createBody function
function createBody() {
    addBody(body, 50, 210,400,400);
}

// //BUGGY createFeet: pass the attributes for addFeet to the createFeet function
// function createFeet() {
//     addFeet(feet, 50, 470, 600, 420);
// }

///HEAD

// when clicking on head2, load head2 on canvas
document.getElementById("head2").addEventListener("click", function () {
    head = "/images/head/head2.png";
    createHead();

});

// when clicking on head1, load head1 on canvas
//not pretty, image sizes need to be adjusted
document.getElementById("head1").addEventListener("click", function () {
    head = "/images/head/head1.png";
    createHead();

});

// when clicking on head3, load head3 on canvas
//not pretty, image sizes need to be adjusted
document.getElementById("head3").addEventListener("click", function () {
    head = "/images/head/head3.png";
    createHead();

});

///BODY

// when clicking on body1, load body1 on canvas
document.getElementById("body1").addEventListener("click", function () {
    body = "/images/body/body1.png";
    createBody();

});

// when clicking on body2, load body2 on canvas
document.getElementById("body2").addEventListener("click", function () {
    body = "/images/body/body2.png";
    createBody();

});

// when clicking on body3, load body3 on canvas
document.getElementById("body3").addEventListener("click", function () {
    body = "/images/body/body3.png";
    createBody();

});

// //BUGGY FEET

// // when clicking on feet1, load feet1 on canvas
// document.getElementById("feet1").addEventListener("click", function () {
//     body = "/images/feet/feet1.png";
//     createFeet();

// });

// // when clicking on feet1, load feet1 on canvas
// document.getElementById("feet2").addEventListener("click", function () {
//     body = "/images/feet/feet2.png";
//     createFeet();

// });

//Create a URL and Opens the canvas as an image in a new window
//doesnt work, the site needs to be live maybe to create a URL  ?

// var button = document.getElementById('btn-download');
// button.addEventListener('click', function (e) {
//     var dataURL = canvas.toDataURL('image/png');
//     button.href = dataURL;
// });
