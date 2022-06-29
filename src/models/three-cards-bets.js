import mongoose from "mongoose";

const bet = {
  uid: { type: String, required: true },
  name: { type: String, required: true },
  phien: { type: Number, required: true },

  red: { type: Number, default: 0 },
  black: { type: Number, default: 0 },
  diamonds: { type: Number, default: 0 },
  hearts: { type: Number, default: 0 },
  spades: { type: Number, default: 0 },
  clubs: { type: Number, default: 0 },

  thanhtoan: { type: Boolean, default: false },
  betwin: { type: Number, default: 0 },
  time: { type: Date },
  odds: { type: Object },

  memberId: { type: Number },
  siteId: { type: String },
  freeBet: { type: Boolean, default: false },

  playerId: { type: Number },
  operatorId: { type: String, required: false },
  roundId: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
};

const ThreeCardsBets = mongoose.model(
  "threecards_cuoc",
  new mongoose.Schema({
    ...bet,
    currency: { type: String, require: true },
    rate: { type: Number, require: true },
    partnerId: { type: String, require: true },
  })
);
const ThreeCardsTmpBets = mongoose.model(
  "threecards_tmpcuoc",
  new mongoose.Schema(bet)
);

export { ThreeCardsBets, ThreeCardsTmpBets };
