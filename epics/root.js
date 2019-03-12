import { combineEpics } from 'redux-observable';
import { postNewRoomEpic } from './gloomhaven-tracker-setup';
import { sseEpic } from './gloomhaven-tracker';

const root = combineEpics(
  postNewRoomEpic,
  sseEpic,
);

export default root;
