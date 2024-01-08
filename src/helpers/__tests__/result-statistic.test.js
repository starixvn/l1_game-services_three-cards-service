import { generateResult, getSettlementResult } from "../result-helper";

jest.setTimeout(80000);
describe("result statistic: 100,000 rounds", () => {
    const calculateStreaks = (streaks, settlementResult, continuity) => {
        Object.keys(continuity).forEach((key) => {
            if (settlementResult[key]) {
                continuity[key]++;
            } else {
                if (continuity[key] >= 4) {
                    streaks[key][continuity[key]] = streaks[key][continuity[key]] ?? 0;
                    streaks[key][continuity[key]] += 1;
                }
                continuity[key] = 0;
            }
        });
    };

    // arrange
    const total = 100_000;
    for (let index = 0; index < 3; index++) {
        it(`should generate results statistically correct with mode ${index + 1}`, () => {
            // arrange
            const statisticResult = { red: 0, black: 0, diamonds: 0, hearts: 0, spades: 0, clubs: 0 };
            const streaks = { red: {}, black: {}, diamonds: {}, hearts: {}, spades: {}, clubs: {} };
            const continuity = { red: 0, black: 0, diamonds: 0, hearts: 0, spades: 0, clubs: 0 };

            // act
            for (let i = 0; i < total; i++) {
                const settlementResult = getSettlementResult(generateResult(index + 1));
                Object.keys(settlementResult).forEach((key) => {
                    statisticResult[key] += +settlementResult[key];
                });
                calculateStreaks(streaks, settlementResult, continuity);
            }

            // assert
            const resultPercentage = Object.keys(statisticResult).reduce((percentage, key) => {
                percentage[key] = +parseFloat((statisticResult[key] / total) * 100).toFixed(2);

                return percentage;
            }, {});
            console.log(
                `Mode:${index + 1}, countResult: ${JSON.stringify(statisticResult)}, percentageResult: ${JSON.stringify(resultPercentage)}`
            );
            console.log(`streak on mode ${index + 1}: ${JSON.stringify(streaks, null, 2)}`);

            expect(resultPercentage.red).toBeGreaterThanOrEqual(49);
            expect(resultPercentage.black).toBeGreaterThanOrEqual(49);
            expect(resultPercentage.diamonds).toBeLessThan(60);
            expect(resultPercentage.hearts).toBeLessThan(60);
            expect(resultPercentage.spades).toBeLessThan(60);
            expect(resultPercentage.clubs).toBeLessThan(60);
        });
    }
});
