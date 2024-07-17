const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"]; //массив символов
const cards = [...symbols, ...symbols]; //карточки с двойным набором символов
let firstCard = null; //первая открытая карта
let secondCard = null; //вторая открытая карта
let lockBoard = false;
let matches = 0; //кол-во найденных пар

//перемешивание карточек
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

shuffle(cards);

//создание карточек
const gameBoard = document.getElementById("game");

cards.forEach((symbol) => {
  let card = document.createElement("div");
  let cardContent = document.createElement("div");
  cardContent.innerText = symbol;
  card.classList.add("card");
  card.appendChild(cardContent);
  gameBoard.appendChild(card);
  card.addEventListener("click", flipCard);
});

//поворот карточки
function flipCard(event) {
  if (lockBoard) return; //если блокировка на true, то ничего не делать

  let clickedCard;

  if (event.target.classList.contains("card")) {
    clickedCard = event.target;
  } else {
    clickedCard = event.target.parentNode;
  }

  if (clickedCard === firstCard) return; // двойное нажатие на одну и ту же карту

  clickedCard.classList.add("flip");

  if (!firstCard) {
    firstCard = clickedCard;
    return;
  } else {
    secondCard = clickedCard;
    lockBoard = true;
    checkForMatch();
  }
}

//проверка на совпадение карточек
function checkForMatch() {
  if (firstCard.innerText === secondCard.innerText) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    disableCards();
  } else {
    unflipCards();
  }
}

//дезактивировать карточки (при совпадении). Конец игры и поздравление, если все карточки найдены
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matches += 1;
  if (matches === 8) {
    alert("Ты выиграл! Молодец!");
  }
  resetBoard();
}

//вернуть карточки обратно (при несовпадении) - ГОТОВО!
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

//разблокировать поле (при возврате карт поле блокируется, чтобы предотвратить нажатие на другие карты) - ГОТОВО!
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
