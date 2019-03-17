import { filter, mapTo, mergeMap, flatMap } from 'rxjs/operators';
import { of, concat } from 'rxjs';
import { observableRequest } from '../utils/request';
import { apiUrl } from '../config';

import { INITIALIZE_TRACKER } from '../reducers/gloomhaven-tracker-setup';
import { initializeSSE, initializeTrackerSuccess } from '../reducers/gloomhaven-tracker';

export const pingEpic = action$ => action$.pipe(
  filter(action => action.type === 'PING'),
  mapTo({ type: 'PONG' })
);

export const postNewRoomEpic = action$ => action$.pipe(
  filter(action => action.type === INITIALIZE_TRACKER),
  mergeMap(action =>
    observableRequest(`${apiUrl}/session`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(action.body)
    }).pipe(
      flatMap(response =>
        concat(
          of(initializeTrackerSuccess(response.roomCode)),
          of(initializeSSE(response.roomCode))
        )
      )
    )
  )
);
