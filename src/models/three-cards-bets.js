import mongoose from "mongoose";

const bet = {
  uid: { type: String, required: true },
  name: { type: String, required: true },

  red: { type: Number, default: 0 },
  black: { type: Number, default: 0 },
  diamonds: { type: Number, default: 0 },
  hearts: { type: Number, default: 0 },
  spades: { type: Number, default: 0 },
  clubs: { type: Number, default: 0 },

  betwin: { type: Number, default: 0 },
  time: { type: Date },
  odds: { type: Object },

  siteId: { type: String },
  freeBet: { type: Boolean, default: false },

  playerId: { type: String },
  roundId: { type: Number, required: true },
  paid: { type: Boolean, default: false },
};

const ThreeCardsBets = mongoose.model(
  "threecards_cuoc",
  new mongoose.Schema({
    ...bet,
    currency: { type: String, required: true },
    rate: { type: Number, required: true },
    operatorId: { type: String, required: true },
  })
);
const ThreeCardsTmpBets = mongoose.model(
  "threecards_tmpcuoc",
  new mongoose.Schema(bet)
);

export { ThreeCardsBets, ThreeCardsTmpBets };
