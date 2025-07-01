function showHands(divname) {
    document.getElementById(divname).style.visibility = "visible"
} 
function hideHands(divname) {
    document.getElementById(divname).style.visibility = "hidden"
}
function refresh(){
        window.location.reload()
      }
var dealertotal = 0
var playertotal = 0
var dealeraces = 0
var playeraces = 0
var hidden;
var deck;
var canHit = true; 
window.onload = function() {
    builddeck()
    shuffle()
    start()
}
function builddeck() {
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K']
    let types = ['C','D','H','S']
    deck = []
    for(let i=0;i<types.length;i++) {
        for(let j=0;j<values.length;j++) {
            deck.push(values[j] + '-' + types[i])
        }
    }
}
function shuffle() {
    for(let i=0; i<deck.length;i++) {
        let rand = Math.floor(Math.random() * deck.length)
        let t = deck[i]
        deck[i] = deck[rand]
        deck[rand] = t;
    }
    console.log(deck)
}
function start() {
    hidden = deck.pop()
    dealertotal += value(hidden)
    dealeraces = aceCheck(hidden)
    //giving cards to the dealer
    while(dealertotal < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src = "./img/"+card+".png"
        dealertotal += value(card)
        dealeraces += aceCheck(card)
        document.getElementById("dealercards").append(cardImg)
    }
    //giving cards to the player
    for(let i=0; i<2; i++) {
               let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src = "./img/"+card+".png"
        playertotal += value(card)
        playeraces += aceCheck(card)
        document.getElementById("yourcards").append(cardImg)
        document.getElementById("yoursum").innerHTML = playertotal;
    }
}
function hit() {

    if(!canHit) {
        alert("You can't hit!")
    }
    else {
    let cardImg = document.createElement("img");
        let card = deck.pop()
        cardImg.src = "./img/"+card+".png"
        playertotal += value(card)
        playeraces += aceCheck(card)
        document.getElementById("yourcards").append(cardImg)
        document.getElementById("yoursum").innerHTML = playertotal;
        if(reduceace(playertotal, playeraces) > 21) {
            canHit = false;
        }
        if(playertotal > 21) {
            canHit = false;
        }
    }
}
function value(card) {
    let data = card.split('-');
    let value = data[0]

    if(isNaN(value)) {
        if(value == 'A') {
            return 11;
        }
        return 10;
    }

    return parseInt(value)
}
function aceCheck(card) {
    if(card[0] == 'A') {
        return 1;
    }
    return 0;
}
function stay() {
playertotal = reduceace(playertotal, playeraces);
dealertotal = reduceace(dealertotal, dealeraces);


    canHit = false;
    document.getElementById('hidden').src = "./img/"+hidden+".png";
    message = ""
    if(playertotal > 21) {
        message = "You lost! Your value was greater than 21"
    }
    else if(dealertotal > 21) {
        message = "You win! Cirno's value was bigger than 21"
    }
    else if(dealertotal == playertotal) {
        message = "There was a tie!"
    }
    else if(dealertotal < playertotal) {
       message = "You win! Your value was bigger than Cirno's!"
    }
    else if(dealertotal > playertotal) {
       message = "You lost. Cirno's value was bigger than yours."
    }
    document.getElementById("condition").innerHTML = message + `<br><input type="button" value="Refresh" onclick="refresh()">`;
    document.getElementById("dealersum").innerHTML = dealertotal;
    document.getElementById("yoursum").innerHTML = playertotal;
}
function reduceace(playersum, playeraces) { 
    while(playersum > 21 && playeraces > 0) {
        playersum -= 10;
        playeraces -= 1;
    }
    return playersum;
}
