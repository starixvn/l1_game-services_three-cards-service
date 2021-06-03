import ThreeCardsBot from "../three-cards-bot";
import { Table } from "sc-game-base";
import gameSettings from "../../game-settings";
import constants from "../../constants";
import { stubMongooseModelStupidly } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { BaseEventPublisher } from "sc-game-base/src/core/event-publishers";
import { generateResult, getSettlementResult } from "../../helpers/result-helper";

const definition = new Table.TableGameDefinition(gameSettings, generateResult, getSettlementResult);
const gameData = new Table.TableGameData(gameSettings.durations.wholeRound, constants.resetTotalBets);
gameData.gameConfigs = {
    choices_maxbet: {
        red: 2000,
        black: 2000,
        diamonds: 2000,
        hearts: 2000,
        spades: 2000,
        clubs: 2000,
    },
    minBet: 1,
    bot_maxbet: 1000,
};

/** @type {mongoose.Model}*/
const userInfosRepository = stubMongooseModelStupidly(mongoose.Model);
/** @type {mongoose.Model}*/
const tempBetsRepository = stubMongooseModelStupidly(mongoose.Model);
const publisher = new BaseEventPublisher(definition.name, gameData);

function initializeThreeCardsBot() {
    return new ThreeCardsBot(definition, gameData, publisher, userInfosRepository, tempBetsRepository);
}

describe("resetAllBets test", () => {
    it("all bet amount of choices should be zero", () => {
        const bot = initializeThreeCardsBot();
        bot.resetAllBets();
        expect(bot.allBets).toEqual(constants.resetTotalBets);
    });
});

describe("getMaxBet test", () => {
    it("should return correct max bet ", () => {
        const bot = initializeThreeCardsBot();
        const maxBet = bot.getMaxBet(null, "red");
        expect(maxBet).toEqual(gameData.gameConfigs.bot_maxbet);
    });
});

describe("getRandomChoiceFromGroup test", () => {
    it("should return valid choice ", () => {
        const bot = initializeThreeCardsBot();
        const choice = bot.getRandomChoiceFromGroup(bot.mainOpts);
        expect(bot.mainOpts).toContain(choice);
    });
});

describe("getBetChoice test", () => {
    it("should return sub choices when main choices have more than 60% bet amount", () => {
        const bot = initializeThreeCardsBot();
        bot.allBets.diamonds = 40;
        bot.allBets.spades = 30;
        bot.allBets.black = 10;
        bot.allBets.red = 20;
        const choice = bot.getBetChoice({ choices: [] });
        expect(bot.subOpts).toContain(choice);
    });

    it("should return main choices when main choices have less than 60% bet amount", () => {
        const bot = initializeThreeCardsBot();
        const choice = bot.getBetChoice({ choices: [] });
        expect(bot.mainOpts).toContain(choice);
    });
});
