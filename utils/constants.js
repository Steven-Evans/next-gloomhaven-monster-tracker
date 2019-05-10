const sseActionTypes = {
  INITIALIZE_SSE_SUCCESS: "gloomhaven-tracker/INITIALIZE_SSE_SUCCESS",
  INITIALIZE_SSE_FAILURE: "gloomhaven-tracker/INITIALIZE_SSE_FAILURE",
  SSE_UPDATE_CHARACTER_INITIATIVE: "gloomhaven-tracker/SSE_UPDATE_CHARACTER_INITIATIVE",
  SSE_UPDATE_CHARACTER_HEALTH: "gloomhaven-tracker/SSE_UPDATE_CHARACTER_HEALTH",
  SSE_UPDATE_CHARACTER_EXPERIENCE: "gloomhaven-tracker/SSE_UPDATE_CHARACTER_EXPERIENCE",
  SSE_UPDATE_CHARACTER_STATUS_EFFECT: "gloomhaven-tracker/SSE_UPDATE_CHARACTER_STATUS_EFFECT",
  SSE_UPDATE_MONSTER_INITIATIVE: "gloomhaven-tracker/SSE_UPDATE_MONSTER_INITIATIVE",
  SSE_UPDATE_MONSTER_HEALTH: "gloomhaven-tracker/SSE_UPDATE_MONSTER_HEALTH",
  SSE_UPDATE_MONSTER_STATUS_EFFECT: "gloomhaven-tracker/SSE_UPDATE_MONSTER_STATUS_EFFECT",
  SSE_CREATE_ACTIVE_MONSTER: "gloomhaven-tracker/SSE_CREATE_ACTIVE_MONSTER",
  SSE_DELETE_ACTIVE_MONSTER: "gloomhaven-tracker/SSE_DELETE_ACTIVE_MONSTER",
};

const characterClasses = [
  {
    codename: "brute",
    name: "Brute",
    nickname: "Brute"
  },
  {
    codename: "scoundrel",
    name: "Scoundrel",
    nickname: "Scoundrel"
  },
  {
    codename: "spellweaver",
    name: "Spellweaver",
    nickname: "Spellweaver"
  },
  {
    codename: "tinkerer",
    name: "Tinkerer",
    nickname: "Tinkerer"
  },
  {
    codename: "mindthief",
    name: "Mindthief",
    nickname: "Mindthief"
  },
  {
    codename: "cragheart",
    name: "Cragheart",
    nickname: "Cragheart"
  },
  {
    codename: "cthulu",
    nickname: "Cthulu"
  },
  {
    codename: "lightningbolt",
    nickname: "Lightning"
  },
  {
    codename: "musicnote",
    nickname: "Music Note"
  },
  {
    codename: "triforce",
    nickname: "Triforce"
  },
  {
    codename: "sun",
    nickname: "Sun"
  },
  {
    codename: "eclipse",
    nickname: "Eclipse"
  },
  {
    codename: "threespears",
    nickname: "Three Spears"
  },
  {
    codename: "angryface",
    nickname: "Angry Face"
  },
  {
    codename: "twominis",
    nickname: "Two Minis"
  },
  {
    codename: "circles",
    nickname: "Circles"
  },
  {
    codename: "bonesaw",
    nickname: "Bone Saw"
  }
];

const monsterClasses = [
  {
    codename: "banditguard",
    name: "Bandit Guard",
    max: 6,
  },
  {
    codename: "banditarcher",
    name: "Bandit Archer",
    max: 6,
  },
  {
    codename: "livingbones",
    name: "Living Bones",
    max: 10,
  },
  {
    codename: "livingcorpse",
    name: "Living Corpse",
    max: 6,
  },
  {
    codename: "livingspirit",
    name: "Living Spirit",
    max: 6,
  },
  {
    codename: "cultist",
    name: "Cultist",
    max: 6,
  },
  {
    codename: "inoxguard",
    name: "Inox Guard",
    max: 6,
  },
  {
    codename: "inoxarcher",
    name: "Inox Archer",
    max: 6,
  },
  {
    codename: "inoxshaman",
    name: "Inox Shaman",
    max: 4,
  },
  {
    codename: "vermlingscout",
    name: "Vermling Scout",
    max: 10,
  },
  {
    codename: "vermlingshaman",
    name: "Vermling Shaman",
    max: 6,
  },
  {
    codename: "cityguard",
    name: "City Guard",
    max: 6,
  },
  {
    codename: "cityarcher",
    name: "City Archer",
    max: 6,
  },
  {
    codename: "earthdemon",
    name: "Earth Demon",
    max: 6,
  },
  {
    codename: "winddemon",
    name: "Wind Demon",
    max: 6,
  },
  {
    codename: "frostdemon",
    name: "Frost Demon",
    max: 6,
  },
  {
    codename: "flamedemon",
    name: "Flame Demon",
    max: 6,
  },
  {
    codename: "nightdemon",
    name: "Night Demon",
    max: 6,
  },
  {
    codename: "sundemon",
    name: "Sun Demon",
    max: 6,
  },
  {
    codename: "lurker",
    name: "Lurker",
    max: 6,
  },
  {
    codename: "deepterror",
    name: "Deep Terror",
    max: 10,
  },
  {
    codename: "blackimp",
    name: "Black Imp",
    max: 10,
  },
  {
    codename: "harrowerinfester",
    name: "Harrower Infester",
    max: 4,
  },
  {
    codename: "giantviper",
    name: "Giant Viper",
    max: 10,
  },
  {
    codename: "forestimp",
    name: "Forest Imp",
    max: 10,
  },
  {
    codename: "hound",
    name: "Hound",
    max: 6,
  },
  {
    codename: "cavebear",
    name: "Cave Bear",
    max: 4,
  },
  {
    codename: "ooze",
    name: "Ooze",
    max: 10,
  },
  {
    codename: "savvaslavaflow",
    name: "Savvas Lavaflow",
    max: 4,
  },
  {
    codename: "savvasicestorm",
    name: "Savvas Icestorm",
    max: 4,
  },
  {
    codename: "spittingdrake",
    name: "Spitting Drake",
    max: 6,
  },
  {
    codename: "rendingdrake",
    name: "Rending Drake",
    max: 6,
  },
  {
    codename: "ancientartillery",
    name: "Ancient Artillery",
    max: 6,
  },
  {
    codename: "stonegolem",
    name: "Stone Golem",
    max: 6,
  },
  {
    codename: "banditcommander",
    name: "Bandit Commander",
    max: 1,
  },
  {
    codename: "mercilessoverseer",
    name: "Merciless Overseer",
    max: 1,
  },
  {
    codename: "inoxbodyguard",
    name: "Inox Bodyguard",
    max: 2,
  },
  {
    codename: "captainoftheguard",
    name: "Captain of the Guard",
    max: 1,
  },
  {
    codename: "jekserah",
    name: "Jekserah",
    max: 1,
  },
  {
    codename: "primedemon",
    name: "Prime Demon",
    max: 1,
  },
  {
    codename: "elderdrake",
    name: "Elder Drake",
    max: 1,
  },
  {
    codename: "thebetrayer",
    name: "The Betrayer",
    max: 1,
  },
  {
    codename: "thecolorless",
    name: "The Colorless",
    max: 1,
  },
  {
    codename: "thesightlesseye",
    name: "The Sightless Eye",
    max: 1,
  },
  {
    codename: "darkrider",
    name: "Dark Rider",
    max: 1,
  },
  {
    codename: "wingedhorror",
    name: "Winged Horror",
    max: 1,
  },
  {
    codename: "thegloom",
    name: "The Gloom",
    max: 1,
  },
];

const scenarioMonsters = {
  1: [
    "banditguard",
    "banditarcher",
    "livingbones",
  ],
  2: [
    "banditarcher",
    "banditcommander",
    "livingbones",
    "livingcorpse",
  ],
  3: [
    "inoxguard",
    "inoxarcher",
    "inoxshaman",
  ],
  4: [
    "livingbones",
    "banditarcher",
    "cultist",
    "earthdemon",
    "winddemon",
  ],
  5: [
    "cultist",
    "livingbones",
    "nightdemon",
    "flamedemon",
    "frostdemon",
  ],
  6: [
    "livingbones",
    "livingcorpse",
    "livingspirit",
  ],
  7: [
    "forestimp",
    "cavebear",
    "inoxshaman",
    "earthdemon",
  ],
  8: [
    "livingbones",
    "livingcorpse",
    "inoxbodyguard",
  ],
  9: [
    "hound",
    "vermlingscout",
    "mercilessoverseer",
  ],
  10: [
    "flamedemon",
    "earthdemon",
    "sundemon",
  ],
  11: [
    "livingbones",
    "livingcorpse",
    "cityguard",
    "cityarcher",
    "captainoftheguard",
  ],
  12: [
    "livingbones",
    "livingcorpse",
    "cultist",
    "cityguard",
    "cityarcher",
    "jekserah",
  ],
  13: [
    "stonegolem",
    "cavebear",
    "livingspirit",
    "spittingdrake",
  ],
  14: [
    "hound",
    "livingspirit",
    "frostdemon",
  ],
  15: [
    "stonegolem",
    "savvasicestorm",
    "frostdemon",
    "winddemon",
    "harrowerinfester",
  ],
  16: [
    "earthdemon",
    "winddemon",
    "inoxguard",
    "inoxarcher",
  ],
  17: [
    "vermlingscout",
    "vermlingshaman",
    "cavebear",
  ],
  18: [
    "giantviper",
    "ooze",
    "vermlingscout",
  ],
  19: [
    "cultist",
    "livingbones",
    "livingspirit",
    "livingcorpse",
  ],
  20: [
    "livingbones",
    "cultist",
    "nightdemon",
    "livingcorpse",
    "jekserah",
  ],
  21: [
    "sundemon",
    "frostdemon",
    "nightdemon",
    "winddemon",
    "earthdemon",
    "flamedemon",
    "primedemon",
  ],
  22: [
    "livingbones",
    "cultist",
    "earthdemon",
    "flamedemon",
    "frostdemon",
    "winddemon",
  ],
  23: [
    "stonegolem",
    "ancientartillery",
    "livingbones",
    "livingspirit",
  ],
  24: [
    "rendingdrake",
    "ooze",
    "livingspirit",
  ],
  25: [
    "hound",
    "rendingdrake",
    "spittingdrake",
  ],
  26: [
    "livingcorpse",
    "ooze",
    "nightdemon",
    "blackimp",
  ],
  27: [
    "nightdemon",
    "winddemon",
    "frostdemon",
    "sundemon",
    "earthdemon",
    "flamedemon",
  ],
  28: [
    "livingcorpse",
    "cultist",
    "livingbones",
    "nightdemon",
    "sundemon",
  ],
  29: [
    "livingbones",
    "livingcorpse",
    "livingspirit",
    "blackimp",
  ],
  30: [
    "ooze",
    "lurker",
    "deepterror",
  ],
  31: [
    "deepterror",
    "nightdemon",
    "blackimp",
  ],
  32: [
    "harrowerinfester",
    "giantviper",
    "deepterror",
    "blackimp",
  ],
  33: [
    "savvasicestorm",
    "savvaslavaflow",
    "winddemon",
    "frostdemon",
    "flamedemon",
    "earthdemon",
  ],
  34: [
    "rendingdrake",
    "spittingdrake",
    "elderdrake",
  ],
  35: [
    "flamedemon",
    "frostdemon",
    "earthdemon",
    "winddemon",
    "cityguard",
    "cityarcher",
    "captainoftheguard",
  ],
  36: [
    "flamedemon",
    "frostdemon",
    "earthdemon",
    "winddemon",
    "cityarcher",
    "primedemon",
  ],
  37: [
    "lurker",
    "deepterror",
    "harrowerinfester",
  ],
  38: [
    "inoxguard",
    "inoxarcher",
    "inoxshaman",
    "stonegolem",
  ],
  39: [
    "cavebear",
    "frostdemon",
    "spittingdrake",
    "cultist",
    "livingbones",
  ],
  40: [
    "livingcorpse",
    "cavebear",
    "flamedemon",
    "stonegolem",
    "forestimp",
  ],
  41: [
    "ancientartillery",
    "livingcorpse",
    "livingspirit",
    "stonegolem",
  ],
  42: [
    "nightdemon",
    "winddemon",
    "livingspirit",
  ],
  43: [
    "flamedemon",
    "rendingdrake",
    "spittingdrake",
  ],
  44: [
    "inoxguard",
    "inoxarcher",
    "hound",
    "inoxshaman",
  ],
  45:  [
    "cityguard",
    "cityarcher",
    "hound",
  ],
  46: [
    "nightdemon",
    "frostdemon",
    "winddemon",
    "savvasicestorm",
    "wingedhorror",
  ],
  47: [
    "lurker",
    "deepterror",
    "harrowerinfester",
    "thesightlesseye",
  ],
  48: [
    "forestimp",
    "earthdemon",
    "harrowerinfester",
    "darkrider",
  ],
  49: [
    "giantviper",
    "cityarcher",
    "cityguard",
    "ancientartillery",
  ],
  50: [
    "nightdemon",
    "sundemon",
    "earthdemon",
    "winddemon",
  ],
  51: [
    "thegloom",
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
  sseActionTypes,
  characterClasses,
  monsterClasses,
  scenarioMonsters,
};
