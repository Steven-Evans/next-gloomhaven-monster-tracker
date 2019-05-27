import { combineEpics } from 'redux-observable';
import { postNewRoomEpic } from './gloomhaven-tracker-setup';
import {
  fetchTrackerStateEpic,
  sseEpic,
  updateCharacterInitiativeEpic,
  updateCharacterStatusEffectEpic,
  updateCharacterHealthEpic,
  updateCharacterExperienceEpic,
  updateMonsterInitiativeEpic,
  updateMonsterHealthEpic,
  updateMonsterStatusEffectEpic,
  createActiveMonsterEpic,
  deleteActiveMonsterEpic,
  setActiveOozesEpic,
} from './gloomhaven-tracker';

const root = combineEpics(
  postNewRoomEpic,
  fetchTrackerStateEpic,
  sseEpic,
  updateCharacterInitiativeEpic,
  updateCharacterStatusEffectEpic,
  updateCharacterHealthEpic,
  updateCharacterExperienceEpic,
  updateMonsterInitiativeEpic,
  updateMonsterHealthEpic,
  updateMonsterStatusEffectEpic,
  createActiveMonsterEpic,
  deleteActiveMonsterEpic,
  setActiveOozesEpic,
);

export default root;
