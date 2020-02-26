import {fromJS} from "immutable";
import reducer from "./../gloomhaven-tracker";
import * as reduxActions from "./../../actions/gloomhaven-tracker";
import sseActions from "../../../server/sseActions";

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
        muddled: true,
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

  test("redux handles character's status effect change", () => {
    let newState = testState.setIn(["characters", "tinkerer", "statusEffects", "poisoned"], true);
    expect(
      reducer(testState, reduxActions.updateCharacterStatusEffect("tinkerer", "poisoned", true))
    ).toEqual(
      newState
    );
  });
  
  test("sse handles character's status effect change", () => {
    let newState = testState.setIn(["characters", "tinkerer", "statusEffects", "muddled"], false);
    expect(
      reducer(testState, sseActions.updateCharacterStatusEffect("tinkerer", "muddled", false))
    ).toEqual(
      newState
    );
  });

  test("redux handles monster's status effect change", () => {
    let newState = testState.setIn(["monsters", "inoxarcher", "active", "1", "statusEffects", "wounded"], false);
    expect(
      reducer(testState, reduxActions.updateMonsterStatusEffect("inoxarcher", "1", "wounded", false))
    ).toEqual(
      newState
    );
  });

  test("sse handles monster's status effect change", () => {
    let newState = testState.setIn(["monsters", "inoxarcher", "active", "1", "statusEffects", "stunned"], true);
    expect(
      reducer(testState, sseActions.updateMonsterStatusEffect("inoxarcher", "1", "stunned", true))
    ).toEqual(
      newState
    );
    console.log('teststate', testState);
  });
});
