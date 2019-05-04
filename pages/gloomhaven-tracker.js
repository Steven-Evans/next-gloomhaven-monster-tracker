import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BossCard from "../components/BossCard/index";
import CharacterCard from "../components/CharacterCard/index";
import MonsterCard from "../components/MonsterCard/index";
import { selectScenarioLevel } from "../reducers/gloomhaven-tracker-setup";
import {
  createMonster,
  updateNewMonsterDialogue,
  selectNewMonsterDialogueOpen,
  selectNewMonsterType,
  selectClassesByInitiative,
  selectActiveStandees,
} from "../reducers/gloomhaven-tracker";
import { isBoss } from '../utils/monster';
import NewMonsterDialog from "../components/NewMonsterDialog";
import InitiativeInputCard from "../components/InitiativeInputCard";

const GloomhavenTracker = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12} md={4}>
          <InitiativeInputCard />
        </Grid>
        <Grid container item xs={12} md={8} spacing={24}>
          {
            props.initiativeSortedClasses.map((sortedClass) => {
              let componentToRender;
              if (!sortedClass[1].active) {
                componentToRender = <CharacterCard name={sortedClass[0]}/>;
              } else if (isBoss(sortedClass[1].name)) {
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
      <NewMonsterDialog
        open={props.newMonsterDialogueOpen}
        onSelectStandee={props.onSelectStandee.bind(null, props.newMonsterType, props.scenarioLevel)}
        numberOfMaxStandees={10}
        activeStandees={props.activeStandees}
        onClose={props.onNewMonsterDialogueClose(props.newMonsterType)}
      />
    </React.Fragment>
  );
};

GloomhavenTracker.getInitialProps = function() {

};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectStandee: (monsterType, scenarioLevel, standee, elite) => () => dispatch(createMonster(standee, monsterType, elite, scenarioLevel)),
    onNewMonsterDialogueClose: (monsterType) => () => dispatch(updateNewMonsterDialogue(monsterType, false)),
  }
};

const mapStateToProps = createStructuredSelector({
  newMonsterDialogueOpen: selectNewMonsterDialogueOpen,
  newMonsterType: selectNewMonsterType,
  initiativeSortedClasses: selectClassesByInitiative,
  scenarioLevel: selectScenarioLevel,
  activeStandees: selectActiveStandees,
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTracker);
