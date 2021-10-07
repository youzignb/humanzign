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
humanzign.head = "";
humanzign.face = "";
humanzign.body = "";
humanzign.feet = "";

//add image with set parameters
function addImage(src, x, y, w, h) {
  let image = new Image();
  image.src = src;
  image.onload = function () {
    ctx.drawImage(image, x, y, w, h); //draw image
  };
}

//clear the canvas then run add image with attributes
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  addImage(humanzign.head, 0, 0, 583, 706);
  addImage(humanzign.face, 0, 0, 583, 706);
  addImage(humanzign.body, 0, 0, 583, 706);
  addImage(humanzign.feet, 0, 0, 583, 706);
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

    //update canvas after everything is loaded and we have head, body, feet images
    updateCanvas();
  });

//assign default images for head, body, feet
function generateThumbnails(array, container, type) {
  switch (type) {
    case HEAD:
      humanzign.head = array[0].image;
      break;

    case FACE:
      humanzign.face = array[0].image;
      break;

    case BODY:
      humanzign.body = array[0].image;
      break;

    case FEET:
      humanzign.feet = array[0].image;
      break;
  }

  //loop through the array
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    //create new image element
    let image = new Image();
    image.alt = element.name;
    image.src = element.thumbnail;
    image.addEventListener("click", () => {
      switch (type) {
        case HEAD:
          humanzign.head = element.image;
          break;

        case FACE:
          humanzign.face = element.image;
          break;

        case BODY:
            humanzign.body = element.image;
            break;

        case FEET:
          humanzign.feet = element.image;
          break;
      }

      updateCanvas();
    });
    container.append(image);
  }
}
