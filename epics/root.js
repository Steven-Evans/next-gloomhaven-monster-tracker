import { combineEpics } from 'redux-observable';
import { postNewRoomEpic } from './gloomhaven-tracker-setup';
import {
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
} from './gloomhaven-tracker';

const root = combineEpics(
  postNewRoomEpic,
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
);

export default root;
