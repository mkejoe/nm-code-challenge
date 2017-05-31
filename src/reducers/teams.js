import { SELECT_TEAM, POPULATE_TEAMS, POPULATE_PLAYERS } from '../constants/ActionTypes';

const initialState = {
	tid: '',
	teams: [],
	players: []
}

export default function teams(state = initialState, action) {
  switch (action.type) {
  case SELECT_TEAM:
    return Object.assign({}, state, { tid: action.payload });
  case POPULATE_TEAMS:
    return Object.assign({}, state, { teams: action.payload });
  case POPULATE_PLAYERS:
    return Object.assign({}, state, { players: action.payload });
  default:
    return state;
  }
}
