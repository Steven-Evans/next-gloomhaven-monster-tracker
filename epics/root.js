import { combineEpics } from 'redux-observable';
import { postNewRoomEpic } from "./gloomhaven-tracker-setup";

const root = combineEpics(
  postNewRoomEpic
);

export default root;
