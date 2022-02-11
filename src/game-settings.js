export default {
  id: 35,
  name: "ThreeCards",
  durations: {
    wholeRound: 39,
    placingBets: 30,
    lockingBet: 5,
  },
  choices: ["red", "black", "diamonds", "hearts", "spades", "clubs"],
  choicesMapper: {
    red: 1,
    black: 2,
    diamonds: 3,
    hearts: 4,
    spades: 5,
    clubs: 6,
  },
  defaultBetTracks: {},
  hedgeBetGroups: [["red", "black"]],
};
