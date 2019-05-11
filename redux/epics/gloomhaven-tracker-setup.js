import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { of, concat } from 'rxjs';
import { observableRequest } from '../../utils/request';
import { apiUrl } from '../../config';

import {initializeSSE, initializeTrackerSuccess} from "../actions/gloomhaven-tracker";
import {INITIALIZE_TRACKER} from "../actionTypes/gloomhaven-tracker-setup";

export const postNewRoomEpic = action$ => action$.pipe(
  ofType(INITIALIZE_TRACKER),
  mergeMap(action =>
    observableRequest(`${apiUrl}/session`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(action.body)
    }).pipe(
      map(response => initializeTrackerSuccess(response.roomCode))
    )
  )
);
