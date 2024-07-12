let emojis = ["😍", "😍", "😂", "😂", "😎", "😎", "😶‍🌫️", "😶‍🌫️", "😡", "😡", "🤡", "🤡", "💀", "💀", "🐋", "🐋", "🥸", "🥸", "🐙", "🐙", "🐣", "🐣", "🧟‍♂️", "🧟‍♂️"]
let grid = document.getElementById("game")

let flipped = []
let clickable = true
let matched = []

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createCard(symbol, i) {
    let box = document.createElement("div");
    box.className = "box";
    box.id = "box" + i;

    let back = document.createElement("div");
    back.textContent = symbol;
    back.id = "back" + i;
    back.className = "back";

    let front = document.createElement("div");
    front.id = "front-" + i;
    front.className = "front";

    box.appendChild(back);
    box.appendChild(front);

    let card = document.createElement("div");
    card.id = "card" + i;
    card.classList.add("flip-card");

    card.addEventListener('click', () => {
        if (!clickable || box.classList.contains("box-rotate") || back.classList.contains("matched"))
            return;
        box.classList.add("box-rotate");
        flipped.push(card);
        if (flipped.length === 2) {
            clickable = false;
            setTimeout(checkMatch, 1000);
        }
    });

    card.appendChild(box);
    return card
}

function checkMatch() {
    var card1 = flipped[0];
    var box1 = card1.getElementsByClassName("box")[0];
    var back1 = box1.getElementsByClassName("back")[0];
    var card2 = flipped[1];
    var box2 = card2.getElementsByClassName("box")[0];
    var back2 = box2.getElementsByClassName("back")[0];
    if (back1.textContent === back2.textContent) {
        matched.push(flipped[0], flipped[1]);
        back1.classList.add("matched");
        back2.classList.add("matched");
    } else {
        box1.classList.remove("box-rotate");
        box2.classList.remove("box-rotate");
    }
    if (matched.length === emojis.length) {
        document.getElementById("result").textContent = "You Won!";
        stopTimer()
    }
    flipped = [];
    clickable = true;
}

function createGrid(emojis) {
    for (var i = 0; i < emojis.length; i++) {
        const card = createCard(emojis[i], i);
        grid.appendChild(card);
    }
    return grid;
}

let startTime;
let endTime;
let timerInterval

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(function () {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;
        let minutes = Math.floor(elapsedTime / (1000 * 60));
        let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        if (minutes < 10)
            minutes = "0" + minutes
        if (seconds < 10)
            seconds = "0" + seconds
        document.getElementById("timer").textContent = minutes + " : " + seconds
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    let endTime = new Date().getTime();
    let totalTime = endTime - startTime;
    let totalMinutes = Math.floor(totalTime / (1000 * 60));
    let totalSeconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    document.getElementById("result").textContent += " Time taken: " + totalMinutes + " minutes " + totalSeconds + " seconds"
}


function start() {
    shuffleArray(emojis);
    createGrid(emojis);
    startTimer()
}

start()