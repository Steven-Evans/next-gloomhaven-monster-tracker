import { ofType } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import {
  selectRoomCode,
  selectCharacter,
  selectMonster,
  selectActiveMonster,
  } from "../reducers/gloomhaven-tracker";
import { observableRequest } from '../../utils/request';
import { apiUrl } from '../../config';
import {
  CREATE_ACTIVE_MONSTER,
  DECREMENT_CHARACTER_EXPERIENCE,
  DECREMENT_CHARACTER_HEALTH,
  DECREMENT_MONSTER_HEALTH,
  DELETE_ACTIVE_MONSTER,
  FETCH_TRACKER_STATE,
  INCREMENT_CHARACTER_EXPERIENCE,
  INCREMENT_CHARACTER_HEALTH,
  INCREMENT_MONSTER_HEALTH,
  INITIALIZE_SSE,
  UPDATE_CHARACTER_EXPERIENCE,
  UPDATE_CHARACTER_HEALTH,
  UPDATE_CHARACTER_INITIATIVE,
  UPDATE_CHARACTER_STATUS_EFFECT,
  UPDATE_MONSTER_HEALTH,
  UPDATE_MONSTER_INITIATIVE,
  UPDATE_MONSTER_STATUS_EFFECT
} from "../actionTypes/gloomhaven-tracker";
import {
  createActiveMonsterFailure,
  createActiveMonsterSuccess,
  deleteActiveMonsterFailure,
  deleteActiveMonsterSuccess,
  fetchTrackerStateSuccess,
  fetchTrackerStateFailure,
  updateCharacterExperienceFailure,
  updateCharacterExperienceSuccess,
  updateCharacterHealthFailure,
  updateCharacterHealthSuccess,
  updateCharacterInitiativeFailure,
  updateCharacterInitiativeSuccess,
  updateCharacterStatusEffectFailure,
  updateCharacterStatusEffectSuccess,
  updateMonsterHealthFailure,
  updateMonsterHealthSuccess,
  updateMonsterInitiativeFailure,
  updateMonsterInitiativeSuccess,
  updateMonsterStatusEffectFailure,
  updateMonsterStatusEffectSuccess
} from "../actions/gloomhaven-tracker";

const apiSessionUrl = (state) => `${apiUrl}/session/${selectRoomCode(state)}`;

export const fetchTrackerStateEpic = action$ => action$.pipe(
  ofType(FETCH_TRACKER_STATE),
  switchMap(action =>
    observableRequest(`${apiUrl}/session/${action.roomCode}`).pipe(
      map(response => fetchTrackerStateSuccess(response)),
      catchError(err => of(fetchTrackerStateFailure(err))),
    )
  )
);

export const sseEpic = action$ => action$.pipe(
  ofType(INITIALIZE_SSE),
  switchMap(action =>
    new Observable(observer => {
      const eventSource = new EventSource(`${apiUrl}/session/${action.roomCode}/sse`);
      eventSource.onmessage = x => observer.next(x);
      eventSource.onerror = x => {console.error('Event Source Error: ', x); /*observer.error(x);*/};
      return () => {
        eventSource.close();
      };
    }).pipe(
      map(response => {
        let json = JSON.parse(response.data);
        return {
          type: json.type,
          ...json.payload,
        }
      })
    )
  )
);

export const updateCharacterInitiativeEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CHARACTER_INITIATIVE),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/character/${action.characterName}/initiative`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({initiative: action.initiative})
    }).pipe(
      map(response => updateCharacterInitiativeSuccess(response)),
      catchError(err => of(updateCharacterInitiativeFailure(err)))
    )
  )
);

export const updateCharacterStatusEffectEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CHARACTER_STATUS_EFFECT),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/character/${action.characterName}/statuseffect/${action.statusEffect}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({checked: action.checked})
    }).pipe(
      map(response => updateCharacterStatusEffectSuccess(response)),
      catchError(err => of(updateCharacterStatusEffectFailure(err)))
    )
  )
);

export const updateCharacterHealthEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CHARACTER_HEALTH, INCREMENT_CHARACTER_HEALTH, DECREMENT_CHARACTER_HEALTH),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/character/${action.characterName}/health`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({health: selectCharacter(action.characterName)(state$.value).get('currentHealth')})
    }).pipe(
      map(response => updateCharacterHealthSuccess(response)),
      catchError(err => of(updateCharacterHealthFailure(err)))
    )
  )
);

export const updateCharacterExperienceEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CHARACTER_EXPERIENCE, INCREMENT_CHARACTER_EXPERIENCE, DECREMENT_CHARACTER_EXPERIENCE),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/character/${action.characterName}/experience`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({experience: selectCharacter(action.characterName)(state$.value).get('experience')})
    }).pipe(
      map(response => updateCharacterExperienceSuccess(response)),
      catchError(err => of(updateCharacterExperienceFailure(err)))
    )
  )
);

export const updateMonsterInitiativeEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_MONSTER_INITIATIVE),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/monster/${action.monsterName}/initiative`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({initiative: action.initiative})
    }).pipe(
      map(response => updateMonsterInitiativeSuccess(response)),
      catchError(err => of(updateMonsterInitiativeFailure(err)))
    )
  )
);

export const updateMonsterHealthEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_MONSTER_HEALTH, INCREMENT_MONSTER_HEALTH, DECREMENT_MONSTER_HEALTH),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/monster/${action.monsterName}/active/${action.standeeNumber}/health`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({health: selectActiveMonster(action.monsterName, action.standeeNumber)(state$.value).get('currentHealth')})
    }).pipe(
      map(response => updateMonsterHealthSuccess(response)),
      catchError(err => of(updateMonsterHealthFailure(err)))
    )
  )
);

export const updateMonsterStatusEffectEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_MONSTER_STATUS_EFFECT),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/monster/${action.monsterName}/active/${action.standeeNumber}/statuseffect/${action.statusEffect}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({checked: action.checked})
    }).pipe(
      map(response => updateMonsterStatusEffectSuccess(response)),
      catchError(err => of(updateMonsterStatusEffectFailure(err)))
    )
  )
);

export const createActiveMonsterEpic = (action$, state$) => action$.pipe(
  ofType(CREATE_ACTIVE_MONSTER),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/monster/${action.monsterName}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        standeeNumber: action.standeeNumber,
        elite: action.elite,
        scenarioLevel: action.scenarioLevel,
      })
    }).pipe(
      map(response => createActiveMonsterSuccess(response)),
      catchError(err => of(createActiveMonsterFailure(err)))
    )
  )
);

export const deleteActiveMonsterEpic = (action$, state$) => action$.pipe(
  ofType(DELETE_ACTIVE_MONSTER),
  mergeMap(action =>
    observableRequest(`${apiSessionUrl(state$.value)}/monster/${action.monsterName}/active/${action.standeeNumber}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).pipe(
      map(response => deleteActiveMonsterSuccess(response)),
      catchError(err => of(deleteActiveMonsterFailure(err)))
    )
  )
);
