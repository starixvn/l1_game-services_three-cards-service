import constants from "../../constants";
import { generateResult, getSettlementResult } from "../result-helper";

const { cardSuit } = constants;
const chanceMock = { pickoneIndex: 0 };

jest.mock("chance", () => {
  return function () {
    const orig = {
      ...jest.requireActual("chance"),
    };

    return {
      shuffle: (arr) => {
        return new orig.Chance().shuffle(arr);
      },
      pickone: (arr) => arr[chanceMock.pickoneIndex],
      floating: (arr) =>new orig.Chance().floating(arr),
    };
  };
});

describe("settlementResult tests", () => {
  const testCases = [
    [
      [
        { suit: cardSuit.hearts },
        { suit: cardSuit.spades },
        { suit: cardSuit.diamonds },
      ],
      {
        red: true,
        black: false,
        diamonds: true,
        hearts: true,
        spades: true,
        clubs: false,
      },
    ],
    [
      [
        { suit: cardSuit.hearts },
        { suit: cardSuit.hearts },
        { suit: cardSuit.diamonds },
      ],
      {
        red: true,
        black: false,
        diamonds: true,
        hearts: true,
        spades: false,
        clubs: false,
      },
    ],
    [
      [
        { suit: cardSuit.hearts },
        { suit: cardSuit.spades },
        { suit: cardSuit.clubs },
      ],
      {
        red: false,
        black: true,
        diamonds: false,
        hearts: true,
        spades: true,
        clubs: true,
      },
    ],
    [
      [
        { suit: cardSuit.spades },
        { suit: cardSuit.spades },
        { suit: cardSuit.spades },
      ],
      {
        red: false,
        black: true,
        diamonds: false,
        hearts: false,
        spades: true,
        clubs: false,
      },
    ],
  ];

  it.each(testCases)(
    "should return correct settlement",
    (result, settlementResult) => {
      expect(getSettlementResult(result)).toEqual(settlementResult);
    }
  );
});

describe("generateResult tests", () => {
  describe("random mode is not 3", () => {
    const randomModes = [0, 1, 2, 4];
    it.each(randomModes)("should return exactly 3 cards", (testCase) => {
      // Arrange
      chanceMock.pickoneIndex = 0;

      // Act
      const result = generateResult(testCase);

      // Assert
      expect(result.length).toEqual(3);
    });
  });

  describe("random mode is 3", () => {
    const randomMode = 3;

    describe("shuffle function is random3", () => {
      it("should return exactly 3 cards", () => {
        // Arrange
        chanceMock.pickoneIndex = 1;

        // Act
        const result = generateResult(randomMode);

        // Assert
        expect(result.length).toEqual(3);
      });
    });

    describe("shuffle function is random4", () => {
      it("should return exactly 3 cards", () => {
        // Arrange
        chanceMock.naturalResult = 2;

        // Act
        const result = generateResult(randomMode);

        // Assert
        expect(result.length).toEqual(3);
      });
    });
  });
});
