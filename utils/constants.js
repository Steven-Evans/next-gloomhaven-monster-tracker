const actionTypes = {
  INITIALIZE_SSE_SUCCESS: "gloomhaven-tracker/INITIALIZE_SSE_SUCCESS",
  INITIALIZE_SSE_FAILURE: "gloomhaven-tracker/INITIALIZE_SSE_FAILURE",

};

const characterClasses = [
  {
    name: "Brute",
    nickname: "Brute"
  },
  {
    name: "Scoundrel",
    nickname: "Scoundrel"
  },
  {
    name: "Spellweaver",
    nickname: "Spellweaver"
  },
  {
    name: "Tinker",
    nickname: "Tinker"
  },
  {
    name: "Mindthief",
    nickname: "Mindthief"
  },
  {
    name: "Cragheart",
    nickname: "Cragheart"
  },
  {
    name: "Plagueherald",
    nickname: "Cthulu"
  },
  {
    name: "Berserker",
    nickname: "Lightning Bolt"
  },
  {
    name: "Bard",
    nickname: "Music Note"
  },
  {
    name: "Elementalist",
    nickname: "Triforce"
  },
  {
    nickname: "Sun"
  },
  {
    nickname: "Eclipse"
  },
  {
    nickname: "Three Spears"
  },
  {
    nickname: "Angry Face"
  },
  {
    nickname: "Two Mini"
  },
  {
    nickname: "Concentric Circles"
  },
  {
    nickname: "Saw"
  }
];

const scenarioMonsters = {
  1: [
    "Bandit Guard",
    "Bandit Archer",
    "Living Bones",
  ],
  2: [
    "Bandit Archer",
    "Bandit Commander",
    "Living Bones",
    "Living Corpse",
  ],
  3: [
    "Inox Guard",
    "Inox Archer",
    "Inox Shaman",
  ],
  4: [
    "Living Bones",
    "Bandit Archer",
    "Cultist",
    "Earth Demon",
    "Wind Demon",
  ],
  5: [
    "Cultist",
    "Living Bones",
    "Night Demon",
    "Flame Demon",
    "Frost Demon",
  ],
  6: [
    "Living Bones",
    "Living Corpse",
    "Living Spirit",
  ],
  7: [
    "Forest Imp",
    "Cave Bear",
    "Inox Shaman",
    "Earth Demon",
  ],
  8: [
    "Living Bones",
    "Living Corpse",
    "Inox Bodyguard",
  ],
  9: [
    "Hound",
    "Vermling Scout",
    "Merciless Overseer",
  ],
  10: [
    "Flame Demon",
    "Earth Demon",
    "Sun Demon",
  ],
  11: [
    "Living Bones",
    "Living Corpse",
    "City Guard",
    "City Archer",
    "Captain of the Guard",
  ],
  12: [
    "Living Bones",
    "Living Corpse",
    "Cutlist",
    "City Guard",
    "City Archer",
    "Jekserah",
  ],
  13: [
    "Stone Golem",
    "Cave Bear",
    "Living Spirit",
    "Spitting Drake",
  ],
  14: [
    "Hound",
    "Living Spirit",
    "Frost Demon",
  ],
  15: [
    "Stone Golem",
    "Savvas Icestorm",
    "Frost Demon",
    "Wind Demon",
    "Harrower Infester",
  ],
  16: [
    "Earth Demon",
    "Wind Demon",
    "Inox Guard",
    "Inox Archer",
  ],
  17: [
    "Vermling Scout",
    "Vermling Shaman",
    "Cave Bear",
  ],
  18: [
    "Giant Viper",
    "Ooze",
    "Vermling Scout",
  ],
  19: [
    "Cultist",
    "Living Bones",
    "Living Spirit",
    "Living Corpse",
  ],
  20: [
    "Living Bones",
    "Cultist",
    "Night Demon",
    "Living Corpse",
    "Jekserah",
  ],
  21: [
    "Sun Demon",
    "Frost Demon",
    "Night Demon",
    "Wind Demon",
    "Earth Demon",
    "Flame Demon",
    "Prime Demon",
  ],
  22: [
    "Living Bones",
    "Cultist",
    "Earth Demon",
    "Flame Demon",
    "Frost Demon",
    "Wind Demon",
  ],
  23: [
    "Stone Golem",
    "Ancient Artillery",
    "Living Bones",
    "Living Spirit",
  ],
  24: [
    "Rending Drake",
    "Ooze",
    "Living Spirit",
  ],
  25: [
    "Hound",
    "Rending Drake",
    "Spitting Drake",
  ],
  26: [
    "Living Corpse",
    "Ooze",
    "Night Demon",
    "Black Imp",
  ],
  27: [
    "Night Demon",
    "Wind Demon",
    "Frost Demon",
    "Sun Demon",
    "Earth Demon",
    "Flame Demon",
  ],
  28: [
    "Living Corpse",
    "Cultist",
    "Living Bones",
    "Night Demon",
    "Sun Demon",
  ],
  29: [
    "Living Bones",
    "Living Corpse",
    "Living Spirit",
    "Black Imp",
  ],
  30: [
    "Ooze",
    "Lurker",
    "Deep Terror",
  ],
  31: [
    "Deep Terror",
    "Night Demon",
    "Black Imp",
  ],
  32: [
    "Harrower Infester",
    "Giant Viper",
    "Deep Terror",
    "Black Imp",
  ],
  33: [
    "Savvas Icestorm",
    "Savvas Lavaflow",
    "Wind Demon",
    "Frost Demon",
    "Flame Demon",
    "Earth Demon",
  ],
  34: [
    "Rending Drake",
    "Spitting Drake",
    "Elder Drake",
  ],
  35: [
    "Flame Demon",
    "Frost Demon",
    "Earth Demon",
    "Wind Demon",
    "City Guard",
    "City Archer",
    "Captain of the Guard",
  ],
  36: [
    "Flame Demon",
    "Frost Demon",
    "Earth Demon",
    "Wind Demon",
    "City Archer",
    "Prime Demon",
  ],
  37: [
    "Lurker",
    "Deep Terror",
    "Harrower Infester",
  ],
  38: [
    "Inox Guard",
    "Inox Archer",
    "Inox Shaman",
    "Stone Golem",
  ],
  39: [
    "Cave Bear",
    "Frost Demon",
    "Spitting Drake",
    "Cultist",
    "Living Bones",
  ],
  40: [
    "Living Corpse",
    "Cave Bear",
    "Flame Demon",
    "Stone Golem",
    "Forest Imp",
  ],
  41: [
    "Ancient Artillery",
    "Living Corpse",
    "Living Spirit",
    "Stone Golem",
  ],
  42: [
    "Night Demon",
    "Wind Demon",
    "Living Spirit",
  ],
  43: [
    "Flame Demon",
    "Rending Drake",
    "Spitting Drake",
  ],
  44: [
    "Inox Guard",
    "Inox Archer",
    "Hound",
    "Inox Shaman",
  ],
  45: [
    "City Guard",
    "City Archer",
    "Hound",
  ],
  46: [
    "Night Demon",
    "Frost Demon",
    "Wind Demon",
    "Savvas Icestorm",
    "Winged Horror",
  ],
  47: [
    "Lurker",
    "Deep Terror",
    "Harrower Infester",
    "The Sightless Eye",
  ],
  48: [
    "Forest Imp",
    "Earth Demon",
    "Harrower Infester",
    "Dark Rider",
  ],
  49: [
    "Giant Viper",
    "City Archer",
    "City Guard",
    "Ancient Artillery",
  ],
  50: [
    "Night Demon",
    "Sun Demon",
    "Earth Demon",
    "Wind Demon",
  ],
  51: [
    "The Gloom",
  ],
  52: [

  ],
  53: [

  ],
  54: [

  ],
  55: [

  ],
  56: [

  ],
  57: [

  ],
  58: [

  ],
  59: [

  ],
  60: [

  ],
  61: [

  ],
  62: [

  ],
  63: [

  ],
  64: [

  ],
  65: [

  ],
  66: [

  ],
  67: [

  ],
  68: [

  ],
  69: [

  ],
  70: [

  ],
  71: [

  ],
  72: [

  ],
  73: [

  ],
  74: [

  ],
  75: [

  ],
  76: [

  ],
  77: [

  ],
  78: [

  ],
  79: [

  ],
  80: [

  ],
  81: [

  ],
  82: [

  ],
  83: [

  ],
  84: [

  ],
  85: [

  ],
  86: [

  ],
  87: [

  ],
  88: [

  ],
  89: [

  ],
  90: [

  ],
  91: [

  ],
  92: [

  ],
  93: [

  ],
  94: [

  ],
  95: [

  ],
};

module.exports = {
  actionTypes,
  characterClasses,
  scenarioMonsters,
};
