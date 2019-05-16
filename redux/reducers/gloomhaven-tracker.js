import Router from 'next/router';
import {fromJS, Map} from "immutable";
import {createSelector} from "reselect";
import {sseActionTypes} from "../../utils/constants";
import {createNewMonster, monstersFromScenarioOrSelect, transformMonsterNamesToState} from "../../utils/monster";
import {transformCharacterNamesToState} from "../../utils/character";
import {
  CREATE_ACTIVE_MONSTER,
  DECREMENT_CHARACTER_EXPERIENCE,
  DECREMENT_CHARACTER_HEALTH,
  DECREMENT_MONSTER_HEALTH,
  DELETE_ACTIVE_MONSTER,
  FETCH_TRACKER_STATE_SUCCESS,
  INCREMENT_CHARACTER_EXPERIENCE,
  INCREMENT_CHARACTER_HEALTH,
  INCREMENT_MONSTER_HEALTH,
  SET_ROOM_CODE,
  UPDATE_CHARACTER_EXPERIENCE,
  UPDATE_CHARACTER_HEALTH,
  UPDATE_CHARACTER_INITIATIVE,
  UPDATE_CHARACTER_STATUS_EFFECT,
  UPDATE_MONSTER_HEALTH,
  UPDATE_MONSTER_INITIATIVE,
  UPDATE_MONSTER_STATUS_EFFECT,
  UPDATE_NEW_MONSTER_DIALOGUE,
} from "../actionTypes/gloomhaven-tracker";
import {INITIALIZE_TRACKER, INITIALIZE_TRACKER_SUCCESS} from "../actionTypes/gloomhaven-tracker-setup";

// State
export const initialState = fromJS({
  roomCode: "",
  newMonsterDialogue: {
    open: false,
    type: "",
  },
  sseConnected: false,
  characters: {},
  monsters: {}
});

// Selectors
export const selectTracker = (state) => state.get('tracker');

export const selectCharacters = (state) => selectTracker(state).get('characters');

export const selectMonsters = (state) => selectTracker(state).get('monsters');

export const selectRoomCode = (state) => selectTracker(state).get('roomCode');

export const selectMonster = (monsterName) => (state) => selectMonsters(state).get(monsterName);

export const selectCharacter = (characterName) => (state) => selectCharacters(state).get(characterName);

export const selectActiveMonster = (monsterName, standeeNumber) => (state) => selectMonster(monsterName)(state).getIn(['active', standeeNumber]);

export const selectNewMonsterDialogueOpen = (state) => selectTracker(state).getIn(['newMonsterDialogue', 'open']);

export const selectNewMonsterType = (state) => selectTracker(state).getIn(['newMonsterDialogue', 'type']);

export const selectMonsterByNewType = (state) => selectMonster(selectNewMonsterType(state))(state);

export const selectMonsterNames = () =>
  createSelector(selectTracker, (trackerState) => trackerState.get('monsters').keySeq());

export const selectClassesByInitiative = createSelector([selectCharacters, selectMonsters], (characters, monsters) => {
  return characters.concat(monsters).entrySeq().sort((a, b) => {
    const difference = a[1].get('initiative') - b[1].get('initiative');
    if (difference === 0) {
      if (!!a[1].get('active') && !b[1].get('active')) {
        return 1;
      } else if (!!b[1].get('active') && !a[1].get('active')) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return difference;
    }
  });
});

export const selectActiveStandees = createSelector(selectMonsterByNewType, (monster) => {
  return !!monster ? monster.get('active').keySeq().toArray() : [];
});

export const makeSelectSortedActiveMonsters = (monsterName) => createSelector([selectMonster(monsterName)], (monster) => {
  const active = monster.get('active').entrySeq();
  return active.filter(standee => standee[1].get('elite')).sortBy(standee => standee[0])
    .concat(active.filter(standee => !standee[1].get('elite')).sortBy(standee => standee[0]));
});

// Reducer
function numberOrEmpty(stateVal) {
  return isNaN(stateVal) ? "" : stateVal;
}

function trackerReducer(state = initialState, action) {
  let keyPath, nextVal;
  switch (action.type) {
    case INITIALIZE_TRACKER:
      return state
        .set("characters", fromJS(transformCharacterNamesToState(action.body.characterClasses)))
        .set("monsters", fromJS(transformMonsterNamesToState(monstersFromScenarioOrSelect(action.body.scenarioNumber, action.body.monsterClasses))));
    case INITIALIZE_TRACKER_SUCCESS:
      Router.push(`/gloomhaven-tracker?roomCode=${action.roomCode}`, `/gloomhaven-tracker/${action.roomCode}`, { shallow: true });
      return state.set("roomCode", action.roomCode);
    case SET_ROOM_CODE:
      return state.set("roomCode", action.roomCode);
    case FETCH_TRACKER_STATE_SUCCESS:
      return state
        .set("characters", fromJS(action.characters))
        .set("monsters", fromJS(action.monsters));
    case sseActionTypes.INITIALIZE_SSE_SUCCESS:
      return state.set("sseConnected", true);
    case UPDATE_CHARACTER_EXPERIENCE:
    case sseActionTypes.SSE_UPDATE_CHARACTER_EXPERIENCE:
      nextVal = parseInt(action.experience);
      return state.setIn(["characters", action.characterName, "experience"], numberOrEmpty(nextVal));
    case INCREMENT_CHARACTER_EXPERIENCE:
      keyPath = ["characters", action.characterName, "experience"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_CHARACTER_EXPERIENCE:
      keyPath = ["characters", action.characterName, "experience"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_HEALTH:
    case sseActionTypes.SSE_UPDATE_CHARACTER_HEALTH:
      nextVal = parseInt(action.currentHealth);
      return state.setIn(["characters", action.characterName, "currentHealth"], numberOrEmpty(nextVal));
    case INCREMENT_CHARACTER_HEALTH:
      keyPath = ["characters", action.characterName, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_CHARACTER_HEALTH:
      keyPath = ["characters", action.characterName, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_INITIATIVE:
    case sseActionTypes.SSE_UPDATE_CHARACTER_INITIATIVE:
      nextVal = parseInt(action.initiative);
      return state.setIn(["characters", action.characterName, "initiative"], numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_STATUS_EFFECT:
    case sseActionTypes.SSE_UPDATE_CHARACTER_STATUS_EFFECT:
      keyPath = ["characters", action.characterName, "statusEffects", action.statusEffect];
      return state.setIn(keyPath, action.checked);
    case CREATE_ACTIVE_MONSTER:
    case sseActionTypes.SSE_CREATE_ACTIVE_MONSTER:
      const newMonsterType = action.monsterType || state.getIn(['newMonsterDialogue', 'type']);
      keyPath = ["monsters", newMonsterType, "active", action.standeeNumber];
      return state
        .setIn(keyPath, fromJS(createNewMonster(newMonsterType, action.standeeNumber, action.elite, action.scenarioLevel)))
        .setIn(['newMonsterDialogue', 'open'], false);
    case UPDATE_MONSTER_INITIATIVE:
    case sseActionTypes.SSE_UPDATE_MONSTER_INITIATIVE:
      nextVal = parseInt(action.initiative);
      return state.setIn(["monsters", action.monsterName, "initiative"], numberOrEmpty(nextVal));
    case UPDATE_MONSTER_HEALTH:
    case sseActionTypes.SSE_UPDATE_MONSTER_HEALTH:
      nextVal = parseInt(action.currentHealth);
      return state.setIn(["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"], numberOrEmpty(nextVal));
    case INCREMENT_MONSTER_HEALTH:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_MONSTER_HEALTH:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DELETE_ACTIVE_MONSTER:
    case sseActionTypes.SSE_DELETE_ACTIVE_MONSTER:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber];
      return state.deleteIn(keyPath);
    case UPDATE_MONSTER_STATUS_EFFECT:
    case sseActionTypes.SSE_UPDATE_MONSTER_STATUS_EFFECT:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "statusEffects", action.statusEffect];
      return state.setIn(keyPath, action.checked);
    case UPDATE_NEW_MONSTER_DIALOGUE:
      return state
        .setIn(["newMonsterDialogue", "type"], action.monsterType)
        .setIn(["newMonsterDialogue", "open"], action.open);
    default:
      return state;
  }
}

export default trackerReducer;
