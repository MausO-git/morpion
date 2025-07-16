const cases = document.querySelectorAll(".case");
let j1 = true
let count = 0;
let gameOver = false;
let soundOn = true;
const replay = document.querySelector(".replay .replayButton");
const htmlReplay = document.querySelector('.replay')
const choose = document.querySelector('.choose')
const chooseX = document.querySelector('.choose .sym .button.cross')
const chooseO = document.querySelector('.choose .sym .button.circle')
const replayZone = document.querySelector('#replayZone')
const replayText = document.querySelector('.replay .text')
const scoreX = document.querySelector('.scoreCross .num')
const scoreO = document.querySelector('.scoreCirc .num')
const scoreDraw = document.querySelector('.scoreDraw .num')
const mute = document.querySelector('#mute')

mute.addEventListener('click', ()=>{
    if(soundOn){
        soundOn = false
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>'
    }else{
        soundOn = true
        mute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160 64 160c-35.3 0-64 28.7-64 64l0 64c0 35.3 28.7 64 64 64l67.8 0L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448l0-384z"/></svg>'
    }
})

const playSound = (soundName)=>{
    if(!soundOn) return;

    const son = new Audio('sound_effect/'+soundName+'.mp3')
    son.play()
}

const board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

const winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



document.addEventListener("DOMContentLoaded", ()=>{
    if(sessionStorage.getItem('winX') === null){
    sessionStorage.setItem('winX', 0)
    sessionStorage.setItem('winO', 0)
    sessionStorage.setItem('draw', 0)
    }

    scoreX.textContent = sessionStorage.getItem('winX')
    scoreO.textContent = sessionStorage.getItem('winO')
    scoreDraw.textContent = sessionStorage.getItem('draw')

    htmlReplay.style.display = "none"
    choose.style.display = "flex"
    replayZone.style.transform = "scale(1)"
})

let crosswin = parseInt(sessionStorage.getItem('winX'))
let circlewin = parseInt(sessionStorage.getItem('winO'))
let draw = parseInt(sessionStorage.getItem('draw'))

const checkWin = (player) =>{
    return winning.some(comb => {
        return comb.every(index => board[index] === player)
    })
}

cases.forEach((caseElem, index) => {
    caseElem.addEventListener("click",()=>{
        console.log(index);
        if(!caseElem.classList.contains("active") && !gameOver){
            caseElem.classList.add("active");
            if(j1){
                playSound("circle");
                caseElem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#f7007c" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>'
                board[index] = "O"
                if(checkWin("O")){
                    gameOver = true;
                    circlewin = parseInt(sessionStorage.getItem('winO'))
                    sessionStorage.setItem('winO', circlewin + 1)
                    scoreO.textContent = sessionStorage.getItem('winO')
                    replayText.innerHTML = `VICTOIRE DES <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#f7007c" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`
                }
            }else{
                playSound("cross")
                caseElem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#37f713" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>'
                board[index] = "X"
                if(checkWin("X")){
                    gameOver = true;
                    crosswin = parseInt(sessionStorage.getItem('winX'))
                    sessionStorage.setItem('winX', crosswin + 1)
                    scoreX.textContent = sessionStorage.getItem('winX')
                    replayText.innerHTML = `VICTOIRE DES <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#37f713" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
                }
            }
            console.log(board);
            j1 = !j1
            count++;
            if(count === 9 && !gameOver){
                gameOver = true;
                draw = parseInt(sessionStorage.getItem('draw'))
                sessionStorage.setItem('draw', draw + 1)
                scoreDraw.textContent = sessionStorage.getItem('draw')
                replayText.innerHTML = `DRAW`
            }
        }
        setTimeout(()=>{
                if(gameOver){
                    replayZone.style.transform = "scale(1)";
                    replay.addEventListener("click", ()=>{
                        cases.forEach(caseElem =>{
                            caseElem.classList.remove("active");
                            caseElem.innerHTML = "";
                        })
                        board.fill("")
                        gameOver = false;
                        count = 0;
                        j1 = true;
                        htmlReplay.style.display = "none";
                        choose.style.display = "flex";
                    })
                }
            }, 500)
    })
})

chooseO.addEventListener("click", ()=>{
    replayZone.style.transform = "scale(0)"
    choose.style.display = "none";
    htmlReplay.style.display = "flex";
    j1 = true;
})

chooseX.addEventListener("click", ()=>{
    replayZone.style.transform = "scale(0)"
    choose.style.display = "none";
    htmlReplay.style.display = "flex";
    j1 = false;
})

