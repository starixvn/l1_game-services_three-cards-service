import constants from "./constants";

const { cardSuit } = constants;
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

export default [
    new Card("A", cardSuit.hearts),
    new Card("A", cardSuit.diamonds),
    new Card("A", cardSuit.clubs),
    new Card("A", cardSuit.spades),
    new Card("2", cardSuit.hearts),
    new Card("2", cardSuit.diamonds),
    new Card("2", cardSuit.clubs),
    new Card("2", cardSuit.spades),
    new Card("3", cardSuit.hearts),
    new Card("3", cardSuit.diamonds),
    new Card("3", cardSuit.clubs),
    new Card("3", cardSuit.spades),
    new Card("4", cardSuit.hearts),
    new Card("4", cardSuit.diamonds),
    new Card("4", cardSuit.clubs),
    new Card("4", cardSuit.spades),
    new Card("5", cardSuit.hearts),
    new Card("5", cardSuit.diamonds),
    new Card("5", cardSuit.clubs),
    new Card("5", cardSuit.spades),
    new Card("6", cardSuit.hearts),
    new Card("6", cardSuit.diamonds),
    new Card("6", cardSuit.clubs),
    new Card("6", cardSuit.spades),
    new Card("7", cardSuit.hearts),
    new Card("7", cardSuit.diamonds),
    new Card("7", cardSuit.clubs),
    new Card("7", cardSuit.spades),
    new Card("8", cardSuit.hearts),
    new Card("8", cardSuit.diamonds),
    new Card("8", cardSuit.clubs),
    new Card("8", cardSuit.spades),
    new Card("9", cardSuit.hearts),
    new Card("9", cardSuit.diamonds),
    new Card("9", cardSuit.clubs),
    new Card("9", cardSuit.spades),
    new Card("10", cardSuit.hearts),
    new Card("10", cardSuit.diamonds),
    new Card("10", cardSuit.clubs),
    new Card("10", cardSuit.spades),
    new Card("J", cardSuit.hearts),
    new Card("J", cardSuit.diamonds),
    new Card("J", cardSuit.clubs),
    new Card("J", cardSuit.spades),
    new Card("Q", cardSuit.hearts),
    new Card("Q", cardSuit.diamonds),
    new Card("Q", cardSuit.clubs),
    new Card("Q", cardSuit.spades),
    new Card("K", cardSuit.hearts),
    new Card("K", cardSuit.diamonds),
    new Card("K", cardSuit.clubs),
    new Card("K", cardSuit.spades),
];
