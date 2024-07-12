const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //массив символов
const cards = [...symbols, ...symbols]; //карточки с двойным набором символов
let firstCard = null; //первая открытая карта
let secondCard = null; //вторая открытая карта
let lockBoard = false;
let matches = 0; //кол-во найденных пар

//перемешивание карточек
/*function shuffle(array) {

    for(let i = array.length -1 ; i > 0; i-- ){
        const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
*/

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

shuffle(cards);

//создание карточек
const gameBoard = document.getElementById('game');

cards.forEach(symbol => {
    let card = document.createElement('div')
    let cardContent = document.createElement('div')
    cardContent.innerText = symbol
    card.classList.add('card')
    card.appendChild(cardContent)
    gameBoard.appendChild(card)
    card.addEventListener('click', flipCard);
});


//поворот карточки
function flipCard(event) {
    if (lockBoard) return; //если блокировка на true, то ничего не делать 
    const clickedCard = event.target;
    console.log(clickedCard)
    clickedCard.classList.add('flip');


    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }
        
    if (firstCard && !secondCard) {
        secondCard = clickedCard;
        lockBoard = true;
        checkForMatch();
    } 
}
/*
gameBoard.addEventListener("click", function(event){
    currentClick = event.target;
    currentClickParent = currentClick.parentNode
    console.log(currentClick)
    if(currentClick.classList.contains('card') || currentClickParent.classList.contains('card')){
        currentClick.classList.toggle('flip')
        currentClickParent.classList.toggle('flip')
    }
    
});
*/
//проверка на совпадение карточек
function checkForMatch() {
   if(firstCard.innerText === secondCard.innerText){
    disableCards()
   }else{
    unflipCards()
    resetBoard()
   };
   
}

//дезактивировать карточки (при совпадении). Конец игры и поздравление, если все карточки найдены
function disableCards() {

}

//вернуть карточки обратно (при несовпадении) - ГОТОВО!
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

//разблокировать поле (при возврате карт поле блокируется, чтобы предотвратить нажатие на другие карты) - ГОТОВО!
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}