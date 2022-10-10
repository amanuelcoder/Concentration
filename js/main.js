 /*----- constants -----*/
const SOURCE_IMG = [
   {img: 'https://i.imgur.com/Cz8SKDi.png',  matched: false},
   {img: 'https://i.imgur.com/lhQZmMe.png', matched: false},
   {img: 'https://i.imgur.com/iecci0K.png', matched: false},
   {img: 'https://i.imgur.com/V1uwgDd.png', matched: false},
   {img: 'https://i.imgur.com/78irYKj.png', matched: false},
   {img: 'https://i.imgur.com/k2svK3c.png', matched: false},
   {img: 'https://i.imgur.com/HBmjAdx.png', matched: false},
   {img: 'https://i.imgur.com/GZBr9tL.png', matched: false},
   {img: 'https://i.imgur.com/3mQpkjX.png', matched: false},
   {img: 'https://i.imgur.com/K7VgXhy.png', matched: false},
   {img: 'https://i.imgur.com/KPxR1ZA.png', matched: false},
   {img: 'https://i.imgur.com/Ddr3lZ1.png', matched: false},
   {img: 'https://i.imgur.com/TDNUZWT.png', matched: false},
   {img: 'https://i.imgur.com/T7YmwoZ.png', matched: false},
   {img: 'https://i.imgur.com/BECDpor.png', matched: false} 
];
const BLOCK_FRONT = '';

  /*----- state variables -----*/
 let blocks; // Array of 30 block objects
 let firstBlock; // First block clicked or null

  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/
  init();
  // Initialize all state, then call render();
  function init() {
     blocks = getShuffledBlocks();
     firstBlock = null;
     render();
  }

  function render() {
    blocks.forEach(function(block, idx) {
        const imgEl = document.getElementById(idx);
        imgEl.src = block.img;
    });
  }

  function getShuffledBlocks() {
    let tempBlocks = [];
    let blocks = [];
    for (let block of SOURCE_IMG) {
        tempBlocks.push(block, block);
    }
    while (tempBlocks.length) {
        let rndIdx = Math.floor(Math.random() * tempBlocks.length); 
        let block = tempBlocks.splice(rndIdx, 1)[0];
        blocks.push(block);
    }
    return blocks;
  }
