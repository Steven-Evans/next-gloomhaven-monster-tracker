import { filter, map, mapTo, mergeMap, flatMap } from 'rxjs/operators';
import { merge, of, concat } from 'rxjs';
import Router from 'next/router';
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
//        Router.push(`/gloomhaven-tracker/?roomCode=${response.roomCode}`, `/gloomhaven-tracker/${response.roomCode}`, { shallow: true });
        concat(
          of(initializeTrackerSuccess(response.roomCode)),
          of(initializeSSE(response.roomCode))
        )
      )
    )
  )
);

export const getEventStreamEpic = action$ => {

};
