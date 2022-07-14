import cards from "../cards";
import constants from "../constants";
import Chance from "chance";
import _ from "lodash";
import { shuffle as d3Shuffle } from "d3-array";
import { Random as RandomJS, MersenneTwister19937 } from "random-js";

const random1 = (arr) => {
  const chance = new Chance();
  return chance.shuffle(chance.shuffle(chance.shuffle(arr)));
};

const random2 = (arr) => {
  return d3Shuffle(d3Shuffle(d3Shuffle(arr)));
};

const random3 = (arr) => {
  let result = arr;
  const r = new RandomJS(MersenneTwister19937.autoSeed());

  for (let i = 0; i < 3; i++) {
    result = r.shuffle(arr);
  }

  return result;
};

const random4 = (arr) => {
  return _.shuffle(_.shuffle(_.shuffle(arr)));
};

const randomModes = {
  1: [random1],
  2: [random2],
  3: [random3, random4],
};

export const generateResult = (randomMode) => {
  const randomShuffles = randomModes[randomMode] || randomModes[1];
  const chance = new Chance();
  const shuffle = chance.pickone(randomShuffles);
  const deck = shuffle(cards);
  return [deck[0], deck[1], deck[2]];
};

export const getSettlementResult = (roundResult) => {
  return {
    red:
      roundResult.filter(
        (card) =>
          card.suit === constants.cardSuit.diamonds ||
          card.suit === constants.cardSuit.hearts
      ).length >= 2,
    black:
      roundResult.filter(
        (card) =>
          card.suit === constants.cardSuit.clubs ||
          card.suit === constants.cardSuit.spades
      ).length >= 2,
    diamonds: roundResult.some(
      (card) => card.suit === constants.cardSuit.diamonds
    ),
    hearts: roundResult.some((card) => card.suit === constants.cardSuit.hearts),
    spades: roundResult.some((card) => card.suit === constants.cardSuit.spades),
    clubs: roundResult.some((card) => card.suit === constants.cardSuit.clubs),
  };
};
