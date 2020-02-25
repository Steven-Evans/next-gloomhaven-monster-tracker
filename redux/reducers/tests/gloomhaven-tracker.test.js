import {fromJS} from "immutable";
import reducer from "./../gloomhaven-tracker";
import {
  updateCharacterStatusEffect,
  updateMonsterStatusEffect,
 } from "./../../actions/gloomhaven-tracker";
 import {sseActionTypes} from "../../../utils/constants";

const initialState = fromJS({
  roomCode: "",
  newMonsterDialogue: {
    open: false,
    type: "",
    eliteDisabled: false,
  },
  oozeSplittingDialogue: {
    open: false,
    tempOozes: {},
    oozeSplits: {},
  },
  sseConnected: false,
  characters: {},
  monsters: {}
});

const testState = fromJS({
  roomCode: "neat",
  newMonsterDialogue: {
    open: false,
    type: "",
    eliteDisabled: false,
  },
  oozeSplittingDialogue: {
    open: false,
    tempOozes: {},
    oozeSplits: {},
  },
  sseConnected: false,
  characters: {
    tinkerer: {
      name: 'Tinkerer',
      initiative: 0,
      currentHealth: 0,
      experience: 1,
      statusEffects: {
        poisoned: false,
        wounded: false,
        disarmed: false,
        stunned: false,
        muddled: false,
        immobilized: false,
        strengthened: false,
        invisible: false
      },
      health: 14
    }
  },
  monsters: {
    inoxarcher: {
      name: 'Inox Archer',
      initiative: 0,
      active: {
        '1': {
          elite: false,
          currentHealth: 12,
          statusEffects: {
            poisoned: false,
            wounded: true,
            disarmed: false,
            stunned: false,
            muddled: false,
            immobilized: false,
            strengthened: false,
            invisible: false
          }
        }
      }
    }
  }
});
  
describe("tracker reducer", () => {

  test("should return initial state with no action", () => {
    expect(reducer(initialState, {})) .toEqual(initialState);
  });

  test("should return initial state with undefined action", () => {
    expect(reducer(initialState, {type: "NOT_AN_ACTION"})).toEqual(initialState);
  });

  test("handles character's status effect change", () => {
    let newState = testState.setIn(["characters", "tinkerer", "statusEffects", "stunned"], true);
    expect(
      reducer(testState, updateCharacterStatusEffect("tinkerer", "stunned", true))
    ).toEqual(
      newState
    );

    expect(
      reducer(testState, {
        type: sseActionTypes.SSE_UPDATE_CHARACTER_STATUS_EFFECT,
        characterName: "tinkerer",
        statusEffect: "stunned",
        checked: true})
    ).toEqual(
      newState
    );
  });

  test("handles monster's status effect change", () => {
    let newState = testState.setIn(["monsters", "inoxarcher", "active", "1", "statusEffects", "wounded"], false);
    expect(
      reducer(testState, updateMonsterStatusEffect("inoxarcher", "1", "wounded", false))
    ).toEqual(
      newState
    );

    expect(
      reducer(testState, {
        type: sseActionTypes.SSE_UPDATE_MONSTER_STATUS_EFFECT,
        monsterName: "inoxarcher",
        standeeNumber: "1",
        statusEffect: "wounded",
        checked: false})
    ).toEqual(
      newState
    );
  });
});
