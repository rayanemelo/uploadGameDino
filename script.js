
//Busca o valor de todas as divs necessárias
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const score = document.getElementById("score");
const gameover = document.getElementById("gameover");
const highscore = document.getElementById("highscore");
const start = document.getElementById("start");
const road = document.getElementById("road");
const bird = document.getElementById("bird");

//Variavel inicial
let start_game = false;


// Inicia o jogo
document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        start.style.display = "none";
        road.classList.add("animation");
        cactus.classList.add("cactus-animation");
        bird.classList.add("bird-animation");
        start_game = true;
        e.preventDefault();
    }
});


// Score
let playerscore = 0;

// Busca o valor da div highscore
let highscore_local = localStorage.getItem('highscore');


//Retorna o valor do playerscore
const zeroScore = (score) => {
    let result

    if (score < 10) {
        result = "0000" + score;
        return result;
    }

    if (score < 100 && score >= 10) {
        result = "000" + score;
        return result;
    }

    if (score >= 100 && score < 1000) {
        result = "00" + score;
        return result;
    }

    if (score >= 1000 && score < 10000) {
        result = "0" + score;
        return result;
    }

    if (score >= 10000) {
        return score;
    }
}

//busca ultimo valor do localstorage
let finalscore = zeroScore(highscore_local);
highscore.innerHTML = `Highscore: <b>${finalscore}</b>`;

//Adiciona valor ao score
const scoreCounter = () => {
    if (start_game == true) {
        playerscore++;
        let finalscore = zeroScore(playerscore);
        score.innerHTML = `Score: <b>${finalscore}</b>`;
    }
}

//Intervalo de contagem do score
let interval = setInterval(scoreCounter, 200);


// Captura evento da tecla, e executa a função de jump dino
document.addEventListener("keyup", (event) => {
    if (event.keyCode === 32) {
        jump();
    }
})

//Jump dino
const jump = () => {
    if (dino.classList != ("jump")) {
        dino.classList.add("jump");

        //Tempo que o dino leva até voltar ao chão
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 1000);
    }
};


//Highscore
const setHighscore = (score) => {

    //Se higschore for null ou undefined, seta o valor em 0
    if (highscore_local == null || highscore_local == undefined) {
        localStorage.setItem('highscore', 0);
    }
    if (highscore_local < score) {
        localStorage.setItem('highscore', score);
        let finalscore = zeroScore(score);
        highscore.innerHTML = `Highscore: <b>${finalscore}</b>`;
    }
}


// Fim do jogo
const gameOver = () => {
    setHighscore(playerscore);
    playerscore = 0;
    start_game = false;
    gameover.style.display = "block";
    score.innerHTML = `Score: <b>0000${playerscore}</b>`;
    road.classList.remove("animation")
    cactus.classList.remove("cactus-animation")
    bird.classList.remove("bird-animation")

    setTimeout(() => {
        gameover.style.display = "none";
        start.style.display = "table";
    }, 500)
}


//Colisão
let isAlive = setInterval(function () {
    //  busca a posiçao do dino em Y 
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    
    // busca a posiçao em X
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));

    //detecta a colisão , caso true, executa a função gameOver()
    if (cactusLeft < 100 && cactusLeft > 0 && dinoTop >= 238 && start_game == true) {
        gameOver();
    };

    if (birdLeft > 0 && birdLeft < 100 && dinoTop <= 200 && start_game == true){
       gameOver();
    };
}, 1);
