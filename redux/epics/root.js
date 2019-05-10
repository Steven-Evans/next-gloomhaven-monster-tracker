import { combineEpics } from 'redux-observable';
import { postNewRoomEpic, pingEpic } from './gloomhaven-tracker-setup';
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
  pingEpic,
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
