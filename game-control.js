/**
 * HTML Elements
 */
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const time = document.querySelector('.time');
const score = document.querySelector('.score');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const restartButton = document.querySelector('.restart');

let finalScore = 0;
let lastHole;
let gameBeingPlayed = false;
let gameClock = 15;
let runningTime = gameClock;

/**
 * Generates a random time for mole to move based on maxTime and minTime
 */
randomTime = (minTime, maxTime) => {
    return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
};

/**
 * Generates a random hole and mole to be displayed.
 * If mole is the same as the last then run randomHole again.
 */
randomHole = holes => {
    let index = Math.floor(Math.random() * holes.length);
    let hole = holes[index];
    moleHit = moles[index];

    lastHole == hole ? randomHole(holes) : moveMole(hole, index);
};

/**
 * Generates a random time for mole to be displayed and hidden
 */
moveMole = (hole, index) => {
    let moleUptime = randomTime(300, 3000);

        lastHole = hole;
        moles[index].classList.add('show');
    
        setTimeout(() => {
            moles[index].classList.remove('show');
            if (gameBeingPlayed) randomHole(holes);
        }, moleUptime);
}

/**
 * Starts Whack-A-Mole Game
 */
startWhackAMole = () => {
    if((!gameBeingPlayed) && (runningTime === gameClock)) { 
        gameBeingPlayed = true;

        randomHole(holes);

        countDownTimer = setInterval(() => {
            runningTime--;
            time.textContent = runningTime;
            if (runningTime === 0 || !gameBeingPlayed) stopWhackAMole();
        }, 1000);
    } else if((!gameBeingPlayed) && (runningTime < gameClock)) {
        window.alert("Please hit Restart and then Start to play again!")
    }
}

/**
 * Stops Whack-A-Mole Game
 */
stopWhackAMole = () => {
    lastHole = null;
    gameBeingPlayed = false;
    clearInterval(countDownTimer);

    moles.forEach(mole => {
        mole.classList.remove('show');
    });
}

/**
 * Restarts Whack-A-Mole Game
 */
restartWhackAMole = () => {
    finalScore = 0;
    lastHole = null;
    gameBeingPlayed = false;
    time.textContent = gameClock;
    time.textContent = runningTime = gameClock;

    moles.forEach(mole => {
        mole.classList.remove('show');
    });
}

/**
 * When script is loaded, adds event listener for every mole and for each
 * click updates the final score.
 */
moles.forEach(mole => {
    mole.addEventListener('click', () => {
        if(mole === moleHit) {
            finalScore++;
            score.textContent = finalScore;
            mole.classList.remove('show');
        }
    });
});