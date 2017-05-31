import { POPULATE_TEAMS, POPULATE_PLAYERS } from '../constants/ActionTypes';
import { get, post } from 'axios';

export function getAllTeams() {
	return (dispatch, getState) => {
		get('/teams').then(function (response) {
			dispatch({
			    type: POPULATE_TEAMS,
			    payload: response.data
			});
		}).catch(function (error) {
			console.log(error);
			dispatch({
				type: 'ERROR'
			});
		});
	}
}
export function getPlayersByTeam(tid) {
	return (dispatch, getState) => {
		get('/teams' + tid).then(function (response) {
			dispatch({
			    type: POPULATE_PLAYERS,
			    payload: response.data
			});
		}).catch(function (error) {
			console.log(error);
			dispatch({
				type: 'ERROR'
			});
		});
	}
}