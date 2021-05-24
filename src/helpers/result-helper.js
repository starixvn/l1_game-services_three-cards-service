import cards from "../cards";
import constants from "../constants";
import Chance from "chance";

export const generateResult = () => {
    const chance = new Chance();
    const deck = chance.shuffle(chance.shuffle(chance.shuffle(cards)));

    return [deck[0], deck[1], deck[2]];
};

export const getSettlementResult = (roundResult) => {
    return {
        red: roundResult.filter((card) => card.suit === constants.cardSuit.diamonds || card.cardSuit === constants.cardSuit.hearts).length >= 2,
        black: roundResult.filter((card) => card.suit === constants.cardSuit.clubs || card.cardSuit === constants.cardSuit.spades).length >= 2,
        diamonds: roundResult.some(card => card.suit === constants.cardSuit.diamonds),
        hearts: roundResult.some(card => card.suit === constants.cardSuit.hearts),
        spades: roundResult.some(card => card.suit === constants.cardSuit.spades),
        clubs: roundResult.some(card => card.suit === constants.cardSuit.clubs),
    };
};
