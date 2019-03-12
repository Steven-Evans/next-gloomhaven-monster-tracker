const scenarioMonsters = require('../utils/constants').scenarioMonsters;

const BASE_26_SET = 'a'.charCodeAt(0);
const ROLL_BY = 111113;

const roomCodeBijection = (roomCode) => {
  let roomVal = roomCode.split("").map((char, index) => {
    return (char.charCodeAt(0) - BASE_26_SET) * Math.pow(26, index);
  }).reduce((acc, val) => acc + val);
  roomVal = (roomVal + ROLL_BY) % Math.pow(26, 4);
  let newCode = [], newDigit, subtractor;
  for (let digitInd = roomCode.length - 1; digitInd >= 0; digitInd--) {
    newDigit = 0;
    subtractor = Math.pow(26, digitInd);
    while (roomVal >= subtractor) {
      roomVal -= subtractor;
      newDigit++;
    }
    newCode.unshift(String.fromCharCode(newDigit + BASE_26_SET))
  }
  return newCode.join("");
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

const validateRoomCode = (roomCode) => {
  return typeof roomCode === "string" &&
    roomCode.split("").filter((char) => char.charCodeAt(0) - BASE_26_SET < 26 && char.charCodeAt(0) - BASE_26_SET >= 0).length === 4;
};

module.exports = {
  roomCodeBijection,
  createInitialSession,
  validateRoomCode,
};
