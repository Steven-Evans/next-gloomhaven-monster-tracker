const statusEffects = () => {
  return {
    poisoned: false,
    wounded: false,
    disarmed: false,
    stunned: false,
    muddled: false,
    immobilized: false,
    strengthened: false,
    invisible: false,
  }
};

const lowerCaseCompareShorter = (immunity, statusEffect) => {
  let formattedImmunity = immunity.charAt(0).toLowerCase() + immunity.slice(1);
  return formattedImmunity === statusEffect.slice(0, formattedImmunity.length);
};

const statusEffectsImmunitiesFiltered = (immunities) => {
  let statEffects = statusEffects();
  let statusKeys = Object.keys(statEffects);
  immunities.forEach((immunity) => {
    statusKeys.forEach((statusKey) => {
      if (lowerCaseCompareShorter(immunity, statusKey)) {
        delete statEffects[statusKey];
      }
    });
  });
  return statEffects;
};

module.exports = {
  statusEffects,
  statusEffectsImmunitiesFiltered,
};
