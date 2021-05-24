import awilix from "awilix";
import { Table } from "sc-game-base";

import { ThreeCardsBot  } from "./crons";
import { ThreeCardsBets, ThreeCardsTmpBets, ThreeCardsRounds } from "./models";

const { asClass, asValue } = awilix;

export default class ThreeCardsContainerRegistry extends Table.TableContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(ThreeCardsRounds),
            betsRepository: asValue(ThreeCardsBets),
            tempBetsRepository: asValue(ThreeCardsTmpBets),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(ThreeCardsBot).singleton(),
        });
    }
}
