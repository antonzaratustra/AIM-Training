"use strict";

const startBtn = document.querySelector('#start');

const screens = document.querySelectorAll('.screen');

const timeList = document.querySelector('#time-list');

const timeEl = document.querySelector('#time');

const board = document.querySelector('#board');

const colors = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => { //можно event передавать без скобок?
    //делегирование событий
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => { //синтаксис без ()
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
        current = `0${current}`;
        if (current % 2 !== 0) {
            timeEl.parentNode.classList.add('red');
        } else {
            timeEl.parentNode.classList.remove('red');
        }

        }
        setTime(current);
    }
    
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`; 
}

function finishGame() {
    //timeEl.parentNode.remove();
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1 class ="score">Счет: <span class = "primary">${score}</span></h1>`
    // for (let i = 300; (i > 0); i--) {
    //     //let randomCircleLoop = setInterval(createRandomCircle, 50);
    //     //randomCircleLoop();
    //     //clearInterval(randomCircleLoop);
    //     createRandomCircle();
    //     //setInterval(createRandomCircle, 50);
    // }
    setInterval(createRandomCircle, 50);
}

function createRandomCircle() {
    const circle = document.createElement('div');

    const size =  getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size)
    //деструктуризация

    setColor(circle);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min) 
}

function setColor (element) {
    const color = getRandomColor();
    element.style.backgroundColor = color; // `${color}`
    element.style.boxShadow = `0 0 50px ${color}`;
}

function getRandomColor () {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
