import { getSettlementResult, generateResult } from "../result-helper";
import constants from "../../constants";

const { cardSuit } = constants;

describe("settlementResult tests", () => {
    const testCases = [
        [
            [{ suit: cardSuit.hearts }, { suit: cardSuit.spades }, { suit: cardSuit.diamonds }],
            { red: true, black: false, diamonds: true, hearts: true, spades: true, clubs: false },
        ],
        [
            [{ suit: cardSuit.hearts }, { suit: cardSuit.hearts }, { suit: cardSuit.diamonds }],
            { red: true, black: false, diamonds: true, hearts: true, spades: false, clubs: false },
        ],
        [
            [{ suit: cardSuit.hearts }, { suit: cardSuit.spades }, { suit: cardSuit.clubs }],
            { red: false, black: true, diamonds: false, hearts: true, spades: true, clubs: true },
        ],
        [
            [{ suit: cardSuit.spades }, { suit: cardSuit.spades }, { suit: cardSuit.spades }],
            { red: false, black: true, diamonds: false, hearts: false, spades: true, clubs: false },
        ],
    ];

    it.each(testCases)("should return correct settlement", (result, settlementResult) => {
        expect(getSettlementResult(result)).toEqual(settlementResult);
    });
});


describe("generateResult tests", () => {
    it("should return exactly 3 cards", () => {
        const result = generateResult();
        expect(result.length).toEqual(3);
    })
});
