import mongoose from "mongoose";

const modelName = "threecards_phien";

const settlementResultSchema = new mongoose.Schema(
    {
        red: { type: Boolean, default: false },
        black: { type: Boolean, default: false },
        diamonds: { type: Boolean, default: false },
        hearts: { type: Boolean, default: false },
        spades: { type: Boolean, default: false },
        clubs: { type: Boolean, default: false },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: { type: Array },
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
});

export default mongoose.model(modelName, Schema);
