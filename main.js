console.log("Main loaded");

let playerName = prompt("Wat is jou naam?");
let age = prompt("Hoe oud ben je?");

showNameAndAge(playerName, age);
function showNameAndAge(firstName, age) {
  alert(
    "Welkom op mijn Speeltje, " + playerName + ". En je bent" + age + " jaar."
  );
}

let turn = "computer";
let computerCredits = 3;
let playerCredits = 3;
let choice;
let playerScore = 0;
let computerScore = 0;

const diceButton = document.querySelector(".dice-button");
const higherButton = document.querySelector(".higher-button");
const lowerButton = document.querySelector(".lower-button");
const goButton = document.querySelector(".go-button");
const text = document.querySelector(".startgm");
const comDiceOne = document.querySelector(".computer-dice-one");
const comDiceTwo = document.querySelector(".computer-dice-two");
const pyDiceOne = document.querySelector(".player-dice-one");
const pyDiceTwo = document.querySelector(".player-dice-two");
const comCredits = document.querySelector(".computer-credits");
const plyCredits = document.querySelector(".player-credits");

// Dobbelsteen symbolen voor weergave
const diceSymbols = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;", "&#9861;",];

// function voor het knoppen
goButton.disabled = false; // 'GO' knop actief
higherButton.disabled = true; // 'Hoger' knop uitgeschakeld
lowerButton.disabled = true; // 'Lager' knop uitgeschakeld
diceButton.disabled = true; // 'Gooi dobbelsteen' knop uitgeschakeld
comCredits.textContent = computerCredits
plyCredits.textContent = playerCredits

// Start het spel bij klikken op de 'GO' knop
goButton.addEventListener("click", startGame);
function startGame() {
  goButton.disabled = true;
  higherButton.disabled = true;
  lowerButton.disabled = true;
  diceButton.disabled = false;
  text.innerHTML = "<b>Het spel is gestart</b>";

  if (turn === "computer") {
    const randomOne = getRandomInt(6);
    const randomTwo = getRandomInt(6);
    console.log(randomOne);
    console.log(randomTwo);
    computerScore = randomOne + randomTwo;

    console.log(randomOne);
    comDiceOne.innerHTML = diceSymbols[randomOne];
    comDiceTwo.innerHTML = diceSymbols[randomTwo];
    text.innerHTML = "<b>De dobbelstenen zijn gegooid!</b>"; // Toon dobbelsteen bericht
    turn = "player";
    goButton.disabled = true;
    higherButton.disabled = false;
    lowerButton.disabled = false;
    diceButton.disabled = true;
  }
}

// // Gooi de dobbelstenen bij klikken op de 'Gooi dobbelsteen' knop
diceButton.addEventListener("click", rollDice);
function rollDice() {
  // als de computer aan de buurt is

  // als de speler aan de buurt is
  const randomOne = getRandomInt(6);
  const randomTwo = getRandomInt(6);
  console.log(randomTwo);
  playerScore = randomOne + randomTwo;
  console.log(choice);
  console.log(playerScore);
  console.log(computerScore);
  if (choice === "higher") {
    if (playerScore > computerScore) {
      text.innerHTML = "<b>De speler wint!</b>"; // winner bepalen.
      computerCredits--; // Trek een punt af van de computer
    } else if (playerScore < computerScore) {
      text.innerHTML = "<b>De speler verliest!</b>";
      playerCredits--; // Trek een punt af van de speler
    } else {
      text.innerHTML = "<b>Het is gelijk!</b>";
    }
  } else if (choice === "lower") {
    if (playerScore < computerScore) {
      text.innerHTML = "<b>De speler wint!</b>";
      computerCredits--; // Trek een punt af van de computer
    } else if (playerScore > computerScore) {
      text.innerHTML = "<b>De speler verliest!</b>";
    } else {
      text.innerHTML = "<b>Het is gelijk!</b>";
      playerCredits--; // Trek een punt af van de speler
    }
  }
  // Update de weergave van de credits
  comCredits.textContent = computerCredits;
  plyCredits.textContent = playerCredits;

  if (playerCredits <= 0) {
    text.innerHTML = "<b>Game Over! De computer heeft gewonnen!</b>";
    goButton.disabled = false;
    resetGame();
  } else if (computerCredits <= 0) {
    text.innerHTML = "<b>Game Over! De speler heeft gewonnen!</b>";
    goButton.disabled = false;
    resetGame();
  }

  console.log(randomOne);
  pyDiceOne.innerHTML = diceSymbols[randomOne];
  pyDiceTwo.innerHTML = diceSymbols[randomTwo];
  turn = "computer";
  goButton.disabled = false;
  higherButton.disabled = true;
  lowerButton.disabled = true;
  diceButton.disabled = true;

  // De knoppen hoger en laher activeren na het gooien van dubbelsteen 
}

higherButton.addEventListener("click", choiceHigher);
function choiceHigher() {
  higherButton.disabled = true; // Je kunt Hoger maar één keer selecteren
  lowerButton.disabled = true; // De Lager-knop wordt uitgeschakeld
  diceButton.disabled = false; // De dobbelsteen knop wordt ook uitgeschakeld
  choice = "higher";
  text.innerHTML = "<b>Hoger! Maak de beste keuze!</b>";
  // dit tekst komt als jij op button hoger klikt.
}

lowerButton.addEventListener("click", choiceLower);
function choiceLower() {
  goButton.disabled = true;
  higherButton.disabled = true;
  lowerButton.disabled = true;
  diceButton.disabled = false;
  text.innerHTML = "<b>Kies voor Lager!</b>";
  choice = "lower";
}

function resetGame() {
  let winnerMessage;

  if (playerCredits <= 0) {
    winnerMessage = "<b>De computer heeft gewonnen!</b>";
  } else {
    winnerMessage = "<b>De speler heeft gewonnen!</b>";
  }

  text.innerHTML = winnerMessage + "<br><br><small>Klik op 'GO' om opnieuw te beginnen!</small>";

  // Reset de spelwaarden direct zonder timeout
  computerCredits = 3;
  playerCredits = 3;
  playerScore = 0;
  computerScore = 0;
  turn = "computer";
  choice = null;

  // Update de UI
  updateCredits();
  comDiceOne.innerHTML = "";
  comDiceTwo.innerHTML = "";
  pyDiceOne.innerHTML = "";
  pyDiceTwo.innerHTML = "";

  goButton.disabled = false; // Maak de 'GO' knop actief
  higherButton.disabled = true; // Schakel de 'Hoger' knop uit
  lowerButton.disabled = true; // Schakel de 'Lager' knop uit
  diceButton.disabled = true; // Schakel de dobbelsteen knop uit
}

function updateCredits() {
  comCredits.textContent = computerCredits;
  plyCredits.textContent = playerCredits;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}