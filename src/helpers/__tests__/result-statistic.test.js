import constants from "../../constants";
import { generateResult, getSettlementResult } from "../result-helper";

jest.setTimeout(80000);
describe("Result statistic: 10000 rounds", () => {
    it("statistic should have expected result", () => {
        const totalRounds = 10000;
        const streaks = {
            red: {},
            black: {},
        };

        const streakNumber = 4;
        const longestStreak = 4;
        let occurrences = 0;
        let prev = "red";
        const stats = {
            streaks: { total: 0, red: 0, black: 0 },
        };

        const randomMode = 3;

        for (let index = 0; index < totalRounds; index++) {
            const result = generateResult(randomMode);
            const settlement = getSettlementResult(result);

            if (settlement[prev]) {
                occurrences++;
            } else {
                if (occurrences >= streakNumber) {
                    stats.streaks.total++;
                    stats.streaks[prev]++;

                    if (occurrences >= longestStreak) {
                        streaks[prev][occurrences] = streaks[prev][occurrences] ?? 0;
                        streaks[prev][occurrences]++;
                    }
                }

                prev = settlement.red ? "red" : "black";
                occurrences = 1;
            }

            Object.keys(settlement).reduce((choiceResults, choice) => {
                stats[choice] = stats[choice] ?? { count: 0, ratio: 0 };
                stats[choice].count += settlement[choice] ? 1 : 0;
                stats[choice].ratio = stats[choice].count / totalRounds;
            }, {});
        }
        console.log(`======== Run ${totalRounds} rounds ========`);

        console.log(stats);
        console.log(`Longest streaks (>=${longestStreak}): `);
        console.log(streaks);
        //Assert
        Object.keys(constants.cardSuit).forEach((choice) => {
            expect(stats[choice].ratio).toBeGreaterThanOrEqual(0.5);
        });
    });
});
