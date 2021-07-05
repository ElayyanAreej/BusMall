'use strict';
// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown
let pImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let voting = 1;
let maxVoting = 25;
//constucter
let product = [];
let productsNames=[];
let votes=[];
let showes=[];
function ProductImage(pImg) {
  this.pName = pImg.split('.')[0];
  this.img = 'img/' + pImg;
  this.show = 0;
  this.clicked = 0;
  product.push(this);
  productsNames.push(this.pName);
}

//creating obj's
for (let i = 0; i < pImg.length; i++) {
  new ProductImage(pImg[i]);
}
console.log(product);

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

function randomIndex() {
  return Math.floor(Math.random() * product.length);
}

let containerEl = document.getElementById('container');
let img1El = document.createElement('img');
let img2El = document.createElement('img');
let img3El = document.createElement('img');

let img1;
let img2;
let img3;


let prevInd=[-1,-1,-1];
function random3img() {
  do {
    img1 = randomIndex();
    img2 = randomIndex();
    img3 = randomIndex();
  } while (img1 === img2 || img2 === img3 || img1 === img3 || img1=== prevInd[0] || img1=== prevInd[1] || img1=== prevInd[2]|| img2=== prevInd[0] || img2=== prevInd[1] || img2=== prevInd[2] || img3=== prevInd[0] || img3=== prevInd[1] || img3=== prevInd[2]);

  prevInd[0]=img1;
  prevInd[1]=img2;
  prevInd[2]=img3;

 console.log(prevInd);
  img1El.setAttribute('id', 'img1');
  img2El.setAttribute('id', 'img2');
  img3El.setAttribute('id', 'img3');
  img1El.setAttribute('src', product[img1].img);
  img2El.setAttribute('src', product[img2].img);
  img3El.setAttribute('src', product[img3].img);
  img1El.setAttribute('title', product[img1].pName);
  img2El.setAttribute('title', product[img2].pName);
  img3El.setAttribute('title', product[img3].pName);
  containerEl.appendChild(img1El);
  containerEl.appendChild(img2El);
  containerEl.appendChild(img3El);
  //For each of the three images, increment its property of times it has been shown by one.
  product[img1].show++;
  product[img2].show++;
  product[img3].show++;


}
console.log(product);

// Attach an event listener to the section of the HTML page where the images are going to be displayed.
// Once the users ‘clicks’ a product, generate three new products for the user to pick from.
let buttonProductEl = document.getElementById('showProducts');
buttonProductEl.addEventListener('click', random3img);

//-----------------------------------------------------------------
// 2.As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
// In the constructor function define a property to hold the number of times a product has been clicked.

// After every selection by the viewer, update the newly added property to reflect if it was clicked.
img1El.addEventListener('click', clickedImg);
img2El.addEventListener('click', clickedImg);
img3El.addEventListener('click', clickedImg);

function clickedImg(event) {
  if (voting <= maxVoting) {
    let clickedImg = event.target.id;
    console.log(clickedImg);

    if (clickedImg === 'img1') {
      product[img1].clicked++;
      random3img();

    }
    if (clickedImg === 'img2') {
      product[img2].clicked++;
      random3img();

    }
    if (clickedImg === 'img3') {
      product[img3].clicked++;
      random3img();
    }
    voting++;
  }
  else{
    console.log(voting);
    img1.removeEventListener('click', clickedImg);
    img2.removeEventListener('click', clickedImg);
    img3.removeEventListener('click', clickedImg);

  }
}

console.log(product);


// As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
// By default, the user should be presented with 25 rounds of voting before ending the session.
// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

// As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
// Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

// After voting rounds have been completed, remove the event listeners on the product.

// Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

// NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.
let buttonResultsEl = document.getElementById('Results');
buttonResultsEl.addEventListener('click', viewResults);

function viewResults(){
  let ulEl=document.createElement('ul');
  for (let i = 0; i < product.length; i++) {
    let liEl = document.createElement('li');
    // liEl.textContent = `${product[i].img} ${product[i].pName} had ${product[i].clicked} votes and was seen ${product[i].show} times .`;
    liEl.innerHTML='<img src=\''+product[i].img+'\'>  '+product[i].pName+' had  '+product[i].clicked + ' votes and was seen  '+ product[i].show+' times . ';
    votes.push(product[i].clicked);
    showes.push(product[i].show);
    ulEl.appendChild(liEl);
  }
  containerEl.appendChild(ulEl);
  buttonProductEl.removeEventListener('click',random3img);
  buttonResultsEl.removeEventListener('click',viewResults);
  chartRender();
}


// let votes=[];
// let showes=[];
// for(let i=0;i<product.length;i++){
//   votes.push(product[i].clicked);
//   showes.push(product[i].show);
// }

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(32, 3, 46,1.0)',
        ],
        borderColor: [
          'rgba(32, 3, 46,1.0)',
        ],
        borderWidth: 2
      },
      {
        label: '# of views',
        data: showes,
        backgroundColor: [
          'rgba(255, 255, 255, 1.0)',
        ],
        borderColor: [
          'rgba(32, 3, 46,1.0)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

