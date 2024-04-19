const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposite = () => {
  while (true) {
    const depositeAmount = prompt("Enter the deposite amount : ");
    const numberDepositeAmount = parseFloat(depositeAmount);

    if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
      console.log("Invalid deposite Amount try agin ..");
    } else {
      return numberDepositeAmount;
    }
  }
};
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines between (1-3) : ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid deposite Amount try agin ..");
    } else {
      return numberOfLines;
    }
  }
};
const getBet = (dpAmount, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per  line ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > dpAmount / lines) {
      console.log("Invalid bet try again ...");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectSymbol = reelSymbols[randomIndex];
      reels[i].push(selectSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};
const tarspose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let nowString = "A";
    for (const [i, symbol] of rows.entries()) {
      nowString += symbol;
      if (i != row.length - 1) {
        nowString += "|";
      }
    }
    console.log(nowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let dpAmount = deposite();
  while (true) {
    console.log("You have a balnace of $" + dpAmount);
    const nmLines = getNumberOfLines();
    const bet = getBet(dpAmount, nmLines);
    dpAmount -= bet * nmLines;
    const reel = spin();
    const rows = tarspose(reel);
    printRows(rows);
    const winnings = getWinnings(rows, bet, nmLines);
    dpAmount += winnings;
    console.log("You Won $" + winnings.toString());

    if (dpAmount <= 0) {
      console.log("You ran out of Money");
      break;
    }
    const playAgain = prompt("Do you want to play again (y/n)?");

    if (playAgain != "y") break;
    console.log("hello");
    console.log("HII");
    console.log("HII");
    console.log("newww");
  }
  console.log("Abhisek");
};
game();
