const scenarioMonsters = require('../utils/constants').scenarioMonsters;

const BASE_26_SET = 'a'.charCodeAt(0);
const ROLL_BY = [15, 5, 21, 9];

const roomCodeBijection = (roomCode) => {
  return roomCode.split("").map((char, index) =>
    String.fromCharCode((char.charCodeAt(0) - BASE_26_SET + ROLL_BY[index]) % 26 + BASE_26_SET)
  ).join("");
};

const createInitialSession = ({roomCode, scenarioLevel, scenarioNumber, monsterClasses, characterClasses}) => {
  if (scenarioNumber > 0) {
    monsterClasses = getMonstersFromNumber(scenarioNumber);
  } else if (monsterClasses.length === 0) {
    throw new Error("No monster classes were received");
  }
  return {
    roomCode,
    scenarioLevel,
    monsters: transformMonsters(monsterClasses),
    characters: transformCharacters(characterClasses),
  };
};

const transformMonsters = (monsterClasses) => {
  let monsters = {};
  monsterClasses.forEach((monsterClass) => {
    monsters[monsterClass] = {
      initiative: 0,
      active: {},
    }
  });
  return monsters;
};

const transformCharacters = (characterClasses) => {
  let characters = {};
  characterClasses.forEach((characterClass) => {
    characters[characterClass] = {
      initiative: 0,
      hitpoints: 0,
      statusEffects: {
        disarmed: false,
        immobilized: false,
        invisible: false,
        muddled: false,
        poisoned: false,
        stunned: false,
        wounded: false,
      },
    };
  });
  return characters;
};

const getMonstersFromNumber = (scenarioNumber) => {
  return scenarioMonsters[scenarioNumber];
};

module.exports = {
  roomCodeBijection,
  createInitialSession,
};
