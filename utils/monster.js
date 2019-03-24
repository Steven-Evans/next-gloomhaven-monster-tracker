const scenarioMonsters = require('./constants').scenarioMonsters;
const statusEffects = require('./statusEffects');
const monsterStats = require('./monster_stats');

const transformMonsterNamesToState = (monsterClasses) => {
  const monsters = {};
  monsterClasses.forEach((monsterClass) => {
    monsters[monsterClass] = createMonsterType(monsterClass);
  });
  return monsters;
};

const monstersFromScenarioOrSelect = (scenarioNumber, monsterClasses) => {
  if (scenarioNumber > 0) {
    monsterClasses = getMonstersFromScenario(scenarioNumber);
  } else if (monsterClasses.length === 0) {
    throw new Error("No monster classes were received");
  }
  return monsterClasses;
};

const getMonstersFromScenario = (scenarioNumber) => {
  return scenarioMonsters[scenarioNumber];
};

const createMonsterType = (monsterClass) => {
  return {
    name: monsterClass,
    initiative: 0,
    active: {},
  }
};

const getMonsterStats = (monsterClass, scenarioLevel, numCharacters) => {
  if (!monsterStats.monsters[monsterClass]) {
    return getBossStats(monsterClass, scenarioLevel, numCharacters);
  }
  return monsterStats.monsters[monsterClass].level.find((monsterByLevel) =>
    monsterByLevel.level === scenarioLevel
  )
};

const getBossStats = (bossName, scenarioLevel, numCharacters) => {
  const boss = monsterStats.bosses[bossName].level.find((monsterByLevel) =>
    monsterByLevel.level === scenarioLevel
  );
  boss.health = getBossHitpoints(boss.health, numCharacters);
  return boss;
};

// Boss health string is always of the form "NxC"
const getBossHitpoints = (hitpointStr, numCharacters) => {
  return hitpointStr.split("x")[0] * numCharacters;
};

const createMonster = (monsterClass, standeeNum, elite, scenarioLevel) => {
  return {
    elite,
    currentHealth: 0, //getMonsterHitpoints(monsterClass, elite, scenarioLevel),
    statusEffects: statusEffects(),
  };
};

module.exports = {
  transformMonsterNamesToState,
  getMonstersFromScenario,
  monstersFromScenarioOrSelect,
  getMonsterStats,
  createMonsterType,
  createMonster,
};
