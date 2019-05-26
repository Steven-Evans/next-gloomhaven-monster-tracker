import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { of, Subject } from 'rxjs'
import { StateObservable } from 'redux-observable'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CharacterCard from "../components/CharacterCard/index";
import MonsterCard from "../components/MonsterCard/index";
import NewMonsterDialog from "../components/NewMonsterDialogue";
import OozeSplittingDialogue from "../components/OozeSplittingDialogue";
import InitiativeInputCard from "../components/InitiativeInputCard";
import { selectScenarioLevel } from "../redux/reducers/gloomhaven-tracker-setup";
import {
  selectClassesByInitiative,
} from "../redux/reducers/gloomhaven-tracker";
import {
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
    if (isServer) {
      store.dispatch(setRoomCode(query.roomCode));
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
    if (this.props.roomCode) {
      this.props.onComponentDidMount(this.props.roomCode);
    }
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
        <NewMonsterDialog />
        <OozeSplittingDialogue />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: (roomCode) => dispatch(initializeSSE(roomCode)),
  }
};

const mapStateToProps = createStructuredSelector({
  initiativeSortedClasses: selectClassesByInitiative,
  scenarioLevel: selectScenarioLevel,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GloomhavenTracker));
