// main script
window.onload = function() {

};
    
    var player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
    var gameState = 'notStarted',  //started // ended
        newGameBtn = document.getElementById('js-newGameButton'),
        pickRock = document.getElementById('js-playerPick_rock'),
        pickPaper = document.getElementById('js-playerPick_paper'),
        pickScissors = document.getElementById('js-playerPick_scissors'),
        newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement'),
        playerPointsElem = document.getElementById('js-playerPoints'),
        playerNameElem = document.getElementById('js-playerName'),
        computerPointsElem = document.getElementById('js-computerPoints'),
        playerPickElem = document.getElementById('js-playerPick'),
        computerPickElem = document.getElementById('js-computerPick'),
        playerResultElem = document.getElementById('js-playerResult'),
        computerResultElem = document.getElementById('js-computerResult'),
        whoWin = document.getElementById('whoWin');

    newGameBtn.addEventListener('click', newGame);
    pickRock.addEventListener('click', function () {playerPick('rock');} );
    pickPaper.addEventListener('click', function () {playerPick('paper');} );
    pickScissors.addEventListener('click', function() {playerPick('scissors');} );

    setGameElements();

    function setGameElements() {
        switch(gameState) {
          case 'started':
              newGameElem.style.display = 'none';
              pickElem.style.display = 'block';
              resultsElem.style.display = 'block';
              whoWin.style.display = 'none';
            break;
          case 'ended':
              newGameBtn.innerText = 'Again ?';
              newGameElem.style.display = 'block';
              pickElem.style.display = 'none';
              resultsElem.style.display = 'none';
              whoWin.style.display = 'block';
            break;
          case 'notStarted':
              newGameElem.style.display = 'block';
              pickElem.style.display = 'none';
              resultsElem.style.display = 'none';
              whoWin.style.display = 'none';
            break;
        }
    }

    function newGame() {
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {
          player.score = computer.score = 0;
          gameState = 'started';
          setGameElements();
      
          playerNameElem.innerHTML = player.name;
          setGamePoints(); // This function has not been created yet
        }     
    }

    function playerPick(playerPick) {
        var computerPick = getComputerPick();
    
        playerPickElem.innerHTML = playerPick;
        computerPickElem.innerHTML = computerPick;

        checkRoundWinner(playerPick, computerPick);
    }

    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random()*3)];
    }

    function checkRoundWinner(playerPick, computerPick) {
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';
      
        var winnerIs = 'player';
    
        if (playerPick == computerPick) {
            winnerIs = 'noone'; // remis
        } else if (
            (computerPick == 'rock' &&  playerPick == 'scissors') ||
            (computerPick == 'scissors' &&  playerPick == 'paper') ||
            (computerPick == 'paper' &&  playerPick == 'rock')) {
    
            winnerIs = 'computer';
        }
    
        if (winnerIs == 'player') {
            playerResultElem.innerHTML = "Win!";
            player.score++;
        } else if (winnerIs == 'computer') {
            computerResultElem.innerHTML = "Win!";
            computer.score++;
        }
        setGamePoints();
    }

    function setGamePoints() {
        playerPointsElem.innerHTML = player.score;
        computerPointsElem.innerHTML = computer.score;

        checkGameWinner(player.score, computer.score);

    }

    function checkGameWinner (player, computer) {
        if (player === 10 || computer === 10) {
            if (player > computer) {
                whoWin.innerHTML = 'Player win with score ' + player + ' to ' + computer;
            } else {
                whoWin.innerHTML = 'Computer win with score ' + computer + ' to ' + player;
            }
            gameState = 'ended';
            setGameElements();            
        }
    }