function shareImage() {
  let percent = exportWidth / canvas.width;
  let imageSrc = downloadCanvas(canvas.width * percent, canvas.height * percent);

  // Capture the UserID from the input field
  let userID = document.getElementById("userIDInput").value;

  fetch('https://api.glideapp.io/api/function/mutateTables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fb75bb64-c005-42e1-a11f-16b900540223'
    },
    body: JSON.stringify({
      appID: 'Z6UKz4WJ28x8gEPjcAGX',
      mutations: [
        {
          kind: 'add-row-to-table',
          tableName: 'native-table-03130a94-06b1-4dc0-95da-1d28362cabfe',
          columnValues: {
                 "Name": “userID”,
        "Ca9jF": “5”, // AppID
        "6xrkR": "DezygnNative“, 
        "TZdW5": “Image”, // Datatype
        "7z50p": "imageSrc", // ImageURL
        "mlPS8": “true”, //private
        "3nVhU": “Humanzign” // Projectname
          }
        }
      ]
    })
  })
  .then(() => {
    console.log('Request sent successfully');
    alert('Image saved to your Dezygn library!');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to save the image.');
  });
}

let buttonShare = document.getElementById("buttonShare");
buttonShare.addEventListener("click", function() {
  if (confirm("Are you sure you want to save this image to your Dezygn library?")) {
    shareImage();
  } else {
    console.log("Save canceled.");
  }
});

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

  let image = new Image();
  image.src = downloadCanvas(canvas.width * percent, canvas.height * percent);

  link.setAttribute("href", image.src);
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

  //trim
  contextDownload = trimCanvas(contextDownload);

  // now export the data from this canvas
  return canvasDownload.toDataURL();
}

let buttonRandom = document.getElementById("buttonRandom");
buttonRandom.addEventListener("click", () => {
  bodyPartIndex = 0;
  clickRandomThumbnail(HEAD);
  clickRandomThumbnail(FACE);
  clickRandomThumbnail(BODY);
  clickRandomThumbnail(FEET);
});

function clickRandomThumbnail(tyle) {
  let thumbnails = document.querySelectorAll(".thumbnail." + tyle);
  for (let j = 0; j < thumbnails.length; j++) {
    const element = thumbnails[j];
    element.classList.remove("selected");
  }
  
  let randomIndex = Math.round(Math.random() * (thumbnails.length-1));
  thumbnails[randomIndex].classList.add("selected");
  thumbnails[randomIndex].click();
}

function trimCanvas(ctx) { // removes transparent edges
  var x, y, w, h, top, left, right, bottom, data, idx1, idx2, found, imgData;
  w = ctx.canvas.width;
  h = ctx.canvas.height;
  if (!w && !h) { return false } 
  imgData = ctx.getImageData(0, 0, w, h);
  data = new Uint32Array(imgData.data.buffer);
  idx1 = 0;
  idx2 = w * h - 1;
  found = false; 
  // search from top and bottom to find first rows containing a non transparent pixel.
  for (y = 0; y < h && !found; y += 1) {
      for (x = 0; x < w; x += 1) {
          if (data[idx1++] && !top) {  
              top = y + 1;
              if (bottom) { // top and bottom found then stop the search
                  found = true; 
                  break; 
              }
          }
          if (data[idx2--] && !bottom) { 
              bottom = h - y - 1; 
              if (top) { // top and bottom found then stop the search
                  found = true; 
                  break;
              }
          }
      }
      if (y > h - y && !top && !bottom) { return false } // image is completely blank so do nothing
  }
  top -= 1; // correct top 
  found = false;
  // search from left and right to find first column containing a non transparent pixel.
  for (x = 0; x < w && !found; x += 1) {
      idx1 = top * w + x;
      idx2 = top * w + (w - x - 1);
      for (y = top; y <= bottom; y += 1) {
          if (data[idx1] && !left) {  
              left = x + 1;
              if (right) { // if left and right found then stop the search
                  found = true; 
                  break;
              }
          }
          if (data[idx2] && !right) { 
              right = w - x - 1; 
              if (left) { // if left and right found then stop the search
                  found = true; 
                  break;
              }
          }
          idx1 += w;
          idx2 += w;
      }
  }
  left -= 1; // correct left
  if(w === right - left + 1 && h === bottom - top + 1) { return true } // no need to crop if no change in size
  w = right - left + 1;
  h = bottom - top + 1;
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  ctx.putImageData(imgData, -left, -top);
  return true;            
}
