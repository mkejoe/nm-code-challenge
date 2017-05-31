import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TeamsActions from '../actions/TeamsActions';
import TeamSelector from '../components/TeamSelector';
import PlayerList from '../components/PlayerList';

class App extends Component {
  componentWillMount() {
    this.props.actions.getAllTeams();
  }

  render() {
    const { tid, teams, players, actions } = this.props;
    return (
      <div className="grid-container">
        <h1>Premier League Teams</h1>
        <TeamSelector teams={teams} actions={actions} />
        <PlayerList players={players} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tid: state.teams.tid,
    teams: state.teams.teams,
    players: state.teams.players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TeamsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
