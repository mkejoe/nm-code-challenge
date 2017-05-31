import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeams } from '../actions/TeamsActions';
import { bindActionCreators } from 'redux';

export default class PlayerList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      playerSearch: ''
    }
  }

  updatePlayerSearch(event) {
    this.setState({playerSearch: event.target.value});
  }

  getPlayerRows(players, playerSearch) {
    let playerRows = [];
    players.sort(function(a, b) {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let name = player.name;
        if (!name.toUpperCase().includes(playerSearch.toUpperCase())) {
          continue;
        }
        playerRows.push(
            <tr key={i}>
              <td>{name}</td>
              <td className="full-list">{player.position}</td>
              <td>{player.jerseyNumber}</td>
              <td className="full-list">{player.dateOfBirth}</td>
              <td className="full-list">{player.nationality}</td>
              <td className="full-list">{player.contractUntil}</td>
            </tr>
        );
    }
    return playerRows
  }
  
  render() {
    const playerRows = this.getPlayerRows(this.props.players, this.state.playerSearch);
    if (this.props.players.length > 0) {
      return (
        <div>
          <input placeholder="Search Players" type="text" onChange={evt => { this.updatePlayerSearch(evt) }} />
          <table className="table side-borders-none">
            <thead>
            <tr>
              <th>name</th>
              <th className="full-list">position</th>
              <th>jersey number</th>
              <th className="full-list">date of birth</th>
              <th className="full-list">nationality</th>
              <th className="full-list">contract until</th>
            </tr>
            </thead>
            <tbody>
            {playerRows}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div data-notification="" className="notification-box info">Please choose a team!</div>
      );
    }
  }
}