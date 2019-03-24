const statusEffects = require('./statusEffects');

const transformCharacterNamesToState = (characterNames) => {
  const characters = {};
  characterNames.forEach((characterName) => {
    characters[characterName] = createCharacterState(characterName);
  });
  return characters;
};

const createCharacterState = (characterName) => {
  return {
    name: characterName,
    initiative: 0,
    currentHealth: 0,
    experience: 0,
    statusEffects: statusEffects(),
  }
};

module.exports = {
  transformCharacterNamesToState,
};
