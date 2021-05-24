import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
});

const ThreeCardsBets = mongoose.model("threecards_cuoc", schema);
const ThreeCardsTmpBets = mongoose.model("threecards_tmpcuoc", schema);

export { ThreeCardsBets, ThreeCardsTmpBets };
