//image export/download width
let exportWidth = 2000;

//default name is Bryan
let humanName = "Bryan";

let url = new URL(window.location.href);

//if there is a URL parameter with the name value, populate that to the humanName variable 
if(url.searchParams.get("name"))
  humanName = url.searchParams.get("name");

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
function loadImage(src, type, w, h) {
  let img = new Image();
  img.crossOrigin = "anonymous";

  // request the XML of your svg file
  let request = new XMLHttpRequest();
  request.open('GET', src, true);

  request.onload = function() {
    // once the request returns, parse the response and get the SVG
    let parser = new DOMParser();
    let result = parser.parseFromString(request.responseText, 'text/xml');
    let inlineSVG = result.querySelector("svg");
    
    // add the attributes Firefox needs. These should be absolute values, not relative
    inlineSVG.setAttribute('width', w +'px');
    inlineSVG.setAttribute('height', h + 'px');
    
    // convert the SVG to a data uri
    let svg64 = btoa(new XMLSerializer().serializeToString(inlineSVG));
    let img64 = 'data:image/svg+xml;base64,' + svg64;
    
    // set that as your image source
    img.src = img64;

    // do your canvas work
    img.onload = function() {
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

    img.onerror = function() {
        //display error
        document.body.appendChild(
            document.createTextNode('\nError loading image: ' + type + " | " + this.src)
        );
    };
  }
  // send the request
  request.send();
}

function bodyPartIndexCounter() {
  bodyPartIndex++;

  if(bodyPartIndex >= 4)
    updateCanvas();
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
fetch("assets/" + humanName + "/database.json")
.then((response) => response.json())
.then((json) => {
  //genetare thumbnails list
  generateThumbnails(json.head, document.getElementById(HEAD).querySelector('.itemsContainer'), HEAD);
  generateThumbnails(json.face, document.getElementById(FACE).querySelector('.itemsContainer'), FACE);
  generateThumbnails(json.body, document.getElementById(BODY).querySelector('.itemsContainer'), BODY);
  generateThumbnails(json.feet, document.getElementById(FEET).querySelector('.itemsContainer'), FEET);
})
.catch((error) => {
  alert("This humanzign does not exist!");
});

//assign default images for head, body, feet
function generateThumbnails(array, container, type) {
  let loadIndex = Math.round(Math.random() * (array.length-1));
  loadImage("assets/" + humanName + "/" + array[loadIndex].image, type, 583, 706);

  //loop through the array
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    //create new image element
    let image = new Image();
    image.alt = element.name;
    image.src = "assets/" + humanName + "/" + element.thumbnail;
    image.addEventListener("click", (event) => {
      let thumbnails = document.querySelectorAll(".thumbnail."+type);

      for (let j = 0; j < thumbnails.length; j++) {
        const element = thumbnails[j];
        element.classList.remove("selected");
      }

      event.currentTarget.classList.add("selected");

      loadImage("assets/" + humanName + "/" + element.image, type, 583, 706);
    });
    
    image.className = "thumbnail "+ type;

    if(index == loadIndex)
      image.classList.add("selected");
    
    container.append(image);
  }
}

let humanNameContainer = document.getElementById("humanNameContainer");
humanNameContainer.innerText = humanName;

let buttonDownload = document.getElementById("buttonDownload")
buttonDownload.addEventListener("click", download);

function download() {
  var link = document.createElement('a');

  let percent = exportWidth / canvas.width;

  link.setAttribute("href", downloadCanvas(canvas.width * percent, canvas.height * percent));
  link.setAttribute("download", `${humanNameContainer.innerText}.png`);
  link.click();  
}

function downloadCanvas(width, height) {
  let canvasDownload = document.createElement('canvas');
  let contextDownload = canvasDownload.getContext('2d');
  canvasDownload.width = width;
  canvasDownload.height = height;

  // re-apply all the drawing instructions to this context
  contextDownload.drawImage(humanzign.feet, 0, 0, width, height);
  contextDownload.drawImage(humanzign.body, 0, 0, width, height);
  contextDownload.drawImage(humanzign.head, 0, 0, width, height);
  contextDownload.drawImage(humanzign.face, 0, 0, width, height);

  // now export the data from this canvas
  return canvasDownload.toDataURL();
}