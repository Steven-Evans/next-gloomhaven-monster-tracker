const { scenarioMonsters, monsterClasses } = require('./constants');
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

const getMonsterName = (monsterClass) => {
  return monsterClasses.find((monClass) => monClass.codename === monsterClass).name;
};

const createMonsterType = (monsterClass) => {
  return {
    name: getMonsterName(monsterClass),
    initiative: 0,
    active: {},
  }
};

const isBoss = (monsterClass) => {
  return !monsterStats.monsters[monsterClass];
};

const getMonsterStats = (monsterClass, scenarioLevel, numCharacters) => {
  if (isBoss) {
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

const getMonsterHitpoints = (monsterClass, elite, scenarioLevel) => {
  const stats = monsterStats.monsters[getMonsterName(monsterClass)].level[scenarioLevel];
  return elite ? stats.elite.health : stats.normal.health;
};

const createNewMonster = (monsterClass, elite, scenarioLevel) => {
  return {
    elite,
    currentHealth: getMonsterHitpoints(monsterClass, elite, scenarioLevel),
    statusEffects: statusEffects(),
  };
};

const stateAfterOozeSplitLogic = (nextState) => {
  let oozeSplits, nextOoze, oozesSize;
  do {
    oozeSplits = nextState.getIn(["oozeSplittingDialogue", "oozeSplits"]);
    if (oozeSplits.isEmpty()) {
      return nextState
        .setIn(["monsters", "ooze", "active"], nextState.getIn(["oozeSplittingDialogue", "tempOozes"]))
        .setIn(["oozeSplittingDialogue", "open"], false);
    } else {
      nextOoze = nextState.getIn(["oozeSplittingDialogue", "tempOozes", oozeSplits.first()]);
      if (nextOoze.get('currentHealth') <= 2) {
        nextState = nextState.deleteIn(["oozeSplittingDialogue", "tempOozes", oozeSplits.first()]);
      } else {
        nextState = nextState.updateIn(["oozeSplittingDialogue", "tempOozes", oozeSplits.first(), "currentHealth"], hp => hp - 2);
      }
      oozesSize = nextState.getIn(["oozeSplittingDialogue", "tempOozes"]).size;
      if (oozesSize === 10 || !nextState.hasIn(["oozeSplittingDialogue", "tempOozes", oozeSplits.first()])) {
        nextState = nextState.setIn(["oozeSplittingDialogue", "oozeSplits"], oozeSplits.rest());
      }
    }
  } while (oozesSize === 10 || !nextState.hasIn(["oozeSplittingDialogue", "tempOozes", oozeSplits.first()]));
  return nextState;
};

module.exports = {
  transformMonsterNamesToState,
  getMonstersFromScenario,
  monstersFromScenarioOrSelect,
  isBoss,
  getMonsterStats,
  createMonsterType,
  createNewMonster,
  stateAfterOozeSplitLogic,
};
