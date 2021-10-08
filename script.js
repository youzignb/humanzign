//constants to avoid typos when using strings
const HEAD = "head";
const FACE = "face";
const BODY = "body";
const FEET = "feet";

//get canvas element
const canvas = document.getElementById("canvas");

//create the 2d context for canvas
const ctx = canvas.getContext("2d");

//draw default human
let humanzign = new Object();

//array that holds the body parts strings
let bodyParts = new Array();

//body part load index
let bodyPartIndex = 0;

//add image with set parameters
function loadImage(src, type, x, y, w, h) 
{
  var img = new Image();
  var src = src;

  // request the XML of your svg file
  var request = new XMLHttpRequest();
  request.open('GET', src, true);

  request.onload = function() {
    // once the request returns, parse the response and get the SVG
    var parser = new DOMParser();
    var result = parser.parseFromString(request.responseText, 'text/xml');
    var inlineSVG = result.getElementsByTagName("svg")[0];
    
    // add the attributes Firefox needs. These should be absolute values, not relative
    inlineSVG.setAttribute('width', w +'px');
    inlineSVG.setAttribute('height', h + 'px');
    
    // convert the SVG to a data uri
    var svg64 = btoa(new XMLSerializer().serializeToString(inlineSVG));
    var img64 = 'data:image/svg+xml;base64,' + svg64;
    
    // set that as your image source
    img.src = img64;

    // do your canvas work
    img.onload = function() 
    {
        switch (type) {
          case HEAD:
            humanzign.head = this;
            break;
        
          case FACE:
            humanzign.face = this;
            break;
        
          case BODY:
            humanzign.body = this;
            break;
        
          case FEET:
            humanzign.feet = this;
            break;
        }

        bodyPartIndexCounter();
    };
  }
  // send the request
  request.send();
}

function bodyPartIndexCounter()
{
  bodyPartIndex++;

  if(bodyPartIndex >= 4)
    updateCanvas()
}

//clear the canvas then run add image with attributes
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(humanzign.feet, 0, 0);
  ctx.drawImage(humanzign.body, 0, 0);
  ctx.drawImage(humanzign.head, 0, 0);
  ctx.drawImage(humanzign.face, 0, 0);
}

//load thumbnails to components divs
fetch("database.json")
  .then((response) => response.json())
  .then((json) => {
    //genetare thumbnails list
    generateThumbnails(json.head, document.getElementById(HEAD), HEAD);
    generateThumbnails(json.face, document.getElementById(FACE), FACE);
    generateThumbnails(json.body, document.getElementById(BODY), BODY);
    generateThumbnails(json.feet, document.getElementById(FEET), FEET);
  });

//assign default images for head, body, feet
function generateThumbnails(array, container, type) {
  loadImage(array[0].image, type, 0, 0, 583, 706);

  //loop through the array
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    //create new image element
    let image = new Image();
    image.alt = element.name;
    image.src = element.thumbnail;
    image.addEventListener("click", () =>
    {
      loadImage(element.image, type, 0, 0, 583, 706);
    });
    container.append(image);
  }
}

let humanName = document.getElementById("humanName");

let buttonDownload = document.getElementById("buttonDownload")
buttonDownload.addEventListener("click", download);

function download()
{
  console.log("download")
  var link = document.createElement('a');
  link.download = `${humanName.innerText}.png`;
  link.href = canvas.toDataURL();
  link.click();
}