import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllTeams } from '../actions/TeamsActions';
import { bindActionCreators } from 'redux';

export default class TeamSelector extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSelectTeam(tid) {
    this.props.actions.getPlayersByTeam(tid);
  }

  getTeamRows() {
    const teams = this.props.teams;
    teams.sort(function(a, b) {
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
    let teamRows = [];
    teamRows.push(<option key='select'>Select Team</option>);
    for (let i = 0; i < teams.length; i++) {
        let team = teams[i];
        let name = team.name;
        let tid = team._links.self.href.substr(team._links.self.href.lastIndexOf('/'));
        teamRows.push(
            <option key={tid} value={tid}>{name}</option>
        );
    }
    return teamRows;
  }

  render() {
    const teamRows = this.getTeamRows();
    return (
      <select onChange={e => this.handleSelectTeam(e.target.value)}>{teamRows}</select>
    );
  }
}