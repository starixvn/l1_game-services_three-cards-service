import { helpers } from "sc-common";
import { Table } from "sc-game-base";
import constants from "../constants";

export default class ThreeCardsBot extends Table.Crons.TableGameBot {
    /**
     * @param {Table.TableGameDefinition} definition
     * @param {Table.TableGameData} gameData
     * @param {Core.BaseEventPublishers.BaseEventPublisher} publisher
     * @param {mongoose.Model} userInfosRepository
     * @param {mongoose.Model} tempBetsRepository
     */

    constructor(definition, gameData, publisher, userInfosRepository, tempBetsRepository) {
        super(definition, gameData, publisher, userInfosRepository, tempBetsRepository);

        this.betChoiceRatio = {
            MainOpts: 60,
            SubOpts: 40,
        };

        this.mainOpts = ["diamonds", "hearts", "spades", "clubs"];
        this.subOpts = ["red", "black"];

        this.resetAllBets();
    }

    async resetInRoomTrackings() {
        await this.userInfosRepository.updateMany(
            { type: true, inGameRoom: this.definition.configName, patternId: 0 },
            { inRoom: false, inGameRoom: "" }
        );
    }

    resetAllBotData() {
        super.resetAllBotData();
        this.resetAllBets();
    }

    resetAllBets() {
        this.allBets = {
            red: 0,
            black: 0,
            diamonds: 0,
            hearts: 0,
            spades: 0,
            clubs: 0,
        };

        this.smallTickets = 0;
    }

    getBetChoice(bot) {
        const totalBotBet = this.getAllBetAmount();

        const betChoiceRatios = [
            {
                group: this.mainOpts,
                underBetRatio: (this.getTotalAmountOnChoiceGroup(this.mainOpts) * 100) / totalBotBet < this.betChoiceRatio.MainOpts,
            },
            {
                group: this.subOpts,
                underBetRatio: (this.getTotalAmountOnChoiceGroup(this.subOpts) * 100) / totalBotBet < this.betChoiceRatio.SubOpts,
            },
        ];

        const underRatioGroups = helpers.arrayHelper.shuffle(betChoiceRatios.filter((data) => data.underBetRatio));

        const choice =
            underRatioGroups.length > 0
                ? this.getRandomChoiceFromGroup(underRatioGroups[0].group)
                : this.getRandomChoiceFromGroup(this.mainOpts);

        const previousUniqueChoices = bot.choices.filter((betChoice) => this.mainOpts.includes(betChoice));

        return previousUniqueChoices.length > 0 ? previousUniqueChoices[0] : choice;
    }

    getMaxBet(bot, choice) {
        const gameConfigs = this.gameData.gameConfigs;
        const maxBetPerChoice = gameConfigs.choices_maxbet[choice];
        const botMaxBet = gameConfigs.bot_maxbet;

        return Math.min(maxBetPerChoice, botMaxBet);
    }

    getRandomChoiceFromGroup(group) {
        const randomIndex = (Math.random() * group.length) >> 0;
        return group[randomIndex];
    }

    getTotalAmountOnChoiceGroup(choices) {
        let total = 0;
        choices.forEach((choice) => (total += this.allBets[choice]));

        return total;
    }

    getTotalAmountOfBotOnChoiceGroup(bot, choices) {
        let total = 0;
        choices.forEach((choice) => (total += bot.betOnChoices[choice]));

        return total;
    }

    getAllBetAmount() {
        let total = 0;
        this.definition.choices.forEach((choice) => (total += this.allBets[choice]));

        return total;
    }
    updateBotInRoomData(bot, choice, amount, balance) {
        super.updateBotInRoomData(bot, choice, amount, balance);

        this.allBets[choice] = this.allBets[choice] ? this.allBets[choice] + amount : amount;
    }

    convertAmountToChip(amount) {
        const chipList = constants.chips.filter((chip) => amount % chip === 0);

        return chipList.length > 0 ? chipList[0] : this.getMinBet();
    }

    getTotalBetAmount(currentBet) {
        return currentBet ? this.definition.choices.reduce((total, choice) => total + currentBet[choice], 0) : 0;
    }
}
