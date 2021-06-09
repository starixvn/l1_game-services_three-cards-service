import constants from "./constants";

const { cardSuit, cardRank } = constants;
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

const cards = [];

Object.values(cardSuit).forEach((suit) => {
    Object.values(cardRank).forEach((rank) => cards.push(new Card(rank, suit)));
});


export default cards;
