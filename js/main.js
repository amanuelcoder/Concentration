
/*----- constants -----*/
const SOURCE_IMG = [
  {img: "https://i.imgur.com/L5LpA5f.png" },
  {img: "https://i.imgur.com/cKcNCmO.png" },
  {img: "https://i.imgur.com/LsT87wn.png" },
  {img: "https://i.imgur.com/hDgSiPs.png" },
  {img: "https://i.imgur.com/rXT3tfP.png" },
  {img: "https://i.imgur.com/BhPM4sB.png" },
  {img: "https://i.imgur.com/f6ps5Tc.png" },
  {img: "https://i.imgur.com/xMZcWrW.png" },
  {img: "https://i.imgur.com/9Xub6nf.png" },
  {img: "https://i.imgur.com/M0jfOtA.png" },
  {img: "https://i.imgur.com/4cAWcdc.png" },
  {img: "https://i.imgur.com/Lac3HMo.png" },
];

const Sound = new Audio('sound/sound.mp3');


/*----- cached elements  -----*/
const gameContainer = document.querySelector(".grid");
const time = document.getElementById("time");
const moves = document.getElementById("moves");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const controls = document.querySelector(".controls");
const result = document.getElementById("result");

/*----- state variables -----*/
let blocks;
let interval;
let firstBlock = false;
let secondBlock = false;

//Initial Time
let seconds = 0, minutes = 0;

//Initial moves and win count
let movesCount = 0, winCount = 0;

//For timer
function timeGenerator() {
    seconds += 1;
if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

//Time 
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  time.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//Move count
function movesCounter() {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;

}

//random block 
function rndBlock(size = 4)  {
  let tempArray = [...SOURCE_IMG];
  let blockValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    blockValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return blockValues;
}

function getShuffledBlocks(blockValues, size = 4) {
  gameContainer.innerHTML = "";
  blockValues = [...blockValues, ...blockValues];
  //simple shuffle
  blockValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="block-container" data-block-value="${blockValues[i].img}">
        <div class="block-before"></div>
        <div class="block-after">
        <img src="${blockValues[i].img}" class="image"/></div>
        </div>`;
  }

  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //blocks
  blocks = document.querySelectorAll(".block-container");
  blocks.forEach((block) => {
    block.addEventListener("click", () => {
      if (!block.classList.contains("matched")) {
        block.classList.add("flipped");
        if (!firstBlock) {
          firstBlock = block;
          firstBlockValue = block.getAttribute("data-block-value");
        } else {
          movesCounter();
          secondBlock = block;
          let secondBlockValue = block.getAttribute("data-block-value");
          if (firstBlockValue == secondBlockValue) {
            firstBlock.classList.add("matched");
            secondBlock.classList.add("matched");
            firstBlock = false;
            winCount += 1;
            if (winCount == Math.floor(blockValues.length / 2)) {
              result.innerHTML = `<h2>You Won!!</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the blocks don't match flip the blocks back to normal
            let [tempFirst, tempSecond] = [firstBlock, secondBlock];
            firstBlock = false;
            secondBlock = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", function() {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
//controls buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
//Start timer
  interval = setInterval(timeGenerator, 1000);
//initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  init();
});

//Stop game
stopButton.addEventListener("click",(stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
function init() {
  result.innerText = "";
  winCount = 0;
  let blockValues = rndBlock();
  getShuffledBlocks(blockValues);
};


