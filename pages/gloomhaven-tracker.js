import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { of, Subject } from 'rxjs'
import { StateObservable } from 'redux-observable'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BossCard from "../components/BossCard/index";
import CharacterCard from "../components/CharacterCard/index";
import MonsterCard from "../components/MonsterCard/index";
import NewMonsterDialog from "../components/NewMonsterDialog";
import InitiativeInputCard from "../components/InitiativeInputCard";
import { selectScenarioLevel } from "../redux/reducers/gloomhaven-tracker-setup";
import {
  selectNewMonsterDialogueOpen,
  selectNewMonsterType,
  selectClassesByInitiative,
  selectActiveStandees,
} from "../redux/reducers/gloomhaven-tracker";
import {
  createMonster,
  updateNewMonsterDialogue,
  fetchTrackerState,
  setRoomCode, initializeSSE,
} from "../redux/actions/gloomhaven-tracker";
import rootEpic from "../redux/epics/root";
import { isBoss } from '../utils/monster';


const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 3}px`,
  },
});

class GloomhavenTracker extends React.Component {

  static async getInitialProps({ query, store, isServer }) {
    store.dispatch(setRoomCode(query.roomCode));
    if (isServer) {
      const state$ = new StateObservable(new Subject(), store.getState());
      const resultAction = await rootEpic(
        of(fetchTrackerState(query.roomCode)),
        state$
      ).toPromise();
      store.dispatch(resultAction);
    }
    return { isServer, roomCode: query.roomCode }
  };

  componentDidMount = function() {
    this.props.onComponentDidMount(this.props.roomCode);
  };

  render() {
    const props = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={24} className={props.classes.cardGrid}>
          <Grid item xs={12} md={4}>
              <InitiativeInputCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={24}>
              {
                props.initiativeSortedClasses.map((sortedClass) => {
                  let componentToRender;
                  if (!sortedClass[1].get('active')) {
                    componentToRender = <CharacterCard name={sortedClass[0]}/>;
                  } else if (isBoss(sortedClass[1].get('name'))) {
                    //componentToRender = <BossCard name={sortedClass[0]}/>;
                  } else {
                    componentToRender = <MonsterCard name={sortedClass[0]} scenarioLevel={props.scenarioLevel}/>;
                  }
                  return (
                    <Grid key={sortedClass[0]} item xs={12}>
                      {componentToRender}
                    </Grid>
                  );
                })
              }
            </Grid>
          </Grid>
        </Grid>
        <NewMonsterDialog
          open={props.newMonsterDialogueOpen}
          onSelectStandee={props.onSelectStandee.bind(null, props.newMonsterType, props.scenarioLevel)}
          numberOfMaxStandees={10}
          activeStandees={props.activeStandees}
          onClose={props.onNewMonsterDialogueClose(props.newMonsterType)}
        />
      </React.Fragment>
    );
  }
}





const mapDispatchToProps = (dispatch) => {
  return {
    onSelectStandee: (monsterType, scenarioLevel, standee, elite) => () => dispatch(createMonster(standee, monsterType, elite, scenarioLevel)),
    onNewMonsterDialogueClose: (monsterType) => () => dispatch(updateNewMonsterDialogue(monsterType, false)),
    onComponentDidMount: (roomCode) => dispatch(initializeSSE(roomCode)),
  }
};

const mapStateToProps = createStructuredSelector({
  newMonsterDialogueOpen: selectNewMonsterDialogueOpen,
  newMonsterType: selectNewMonsterType,
  initiativeSortedClasses: selectClassesByInitiative,
  scenarioLevel: selectScenarioLevel,
  activeStandees: selectActiveStandees,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GloomhavenTracker));
