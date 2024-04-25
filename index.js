let winnn = new Audio("winnn.mp3")
let draw = new Audio("draw.mp3")
let start = new Audio("start.mp3")
let tap = new Audio("tap.mp3")

let gameover = false
let turn = "X"
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}
const checkForWin = () => {
    let text = document.getElementsByClassName('text')
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach((e) => {
        if ((text[e[0]].innerText === text[e[1]].innerText) && (text[e[2]].innerText === text[e[1]].innerText) && (text[e[0]].innerText !== "")) {
            // document.body.style.backgroundColor="#00000092";
            document.querySelector('.check').innerText = text[e[0]].innerText + " Wins"
            winnn.play();
            gameover = true
        }
    })
}

const checkForTie = () => {
    let texts = document.querySelectorAll('.text');
    let filledBoxes = 0;
    texts.forEach(text => {
        if (text.innerText !== '') {
            filledBoxes++;
        }
    });

    if (filledBoxes === texts.length && !gameover) {
        document.querySelector('.check').innerText = "It's a Tie!";
        // document.body.style.backgroundColor="#00000092";

        draw.play();
        gameover = true;
    }
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let text = element.querySelector('.text');
    element.addEventListener('click', () => {
        if (gameover) {
            return; // If the game is already over, do nothing
        }
        if (text.innerText === '') {
            text.innerText = turn;
            tap.play();
            turn = changeTurn();
            checkForWin();
            if (!gameover) {
                document.getElementsByClassName("check")[0].innerText = "Turn for " + turn;
            }
            checkForTie();
        }
    });
});

restartGame.addEventListener('click', () => {
    let texts = document.querySelectorAll('.text');
    Array.from(texts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameover = false
    document.getElementsByClassName("check")[0].innerText = "Turn for " + turn;
    // document.body.style.backgroundColor="white";

    start.play();
});
