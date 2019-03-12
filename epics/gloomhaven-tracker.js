import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { INITIALIZE_SSE } from "../reducers/gloomhaven-tracker";
import { apiUrl } from '../config';

export const sseEpic = action$ => action$.pipe(
  filter(action => action.type === INITIALIZE_SSE),
  switchMap(action =>
    Observable.create(observer => {
      const eventSource = new EventSource(`${apiUrl}/session/${action.roomCode}`);
      eventSource.onmessage = x => observer.next(x);
      eventSource.onerror = x => observer.error(x);
      return () => {
        eventSource.close();
      };
    }).pipe(
      map(response => {
        let json = JSON.parse(response.data);
        return {
          type: json.type,
          payload: json.payload,
        }
      })
    )
  )
);