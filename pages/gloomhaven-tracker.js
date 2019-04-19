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
import { selectScenarioNumber } from "../reducers/gloomhaven-tracker-setup";
import { selectClassesByInitiative } from "../reducers/gloomhaven-tracker";
import { isBoss } from '../utils/monster';

const GloomhavenTracker = (props) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={4}>
        <Paper>
          xs
        </Paper>
      </Grid>
      <Grid container item xs={12} sm={8}>
        {
          props.initiativeSortedClasses.map((sortedClass) => {
            let componentToRender;
            if (!sortedClass.active) {
              componentToRender = <CharacterCard name={sortedClass.name}/>;
            } else if (isBoss(sortedClass.name)) {
              //componentToRender = <BossCard name={sortedClass.name}/>;
            } else {
              componentToRender = <MonsterCard name={sortedClass.name}/>;
            }
            return (
              <Grid key={sortedClass.name} item xs={12}>
                {componentToRender}
              </Grid>
            );
          })
        }
      </Grid>
  </Grid>
  );
};

/*<div>
  <List>
    {
      props.characterClasses.map(characterClass => (
        <ListItem key={characterClass}>
          <ListItemText>{characterClass}</ListItemText>
        </ListItem>
      ))
    }
    {
      props.monsterClasses.map(monsterClass => (
        <ListItem key={monsterClass}>
          <ListItemText>{monsterClass}</ListItemText>
        </ListItem>
      ))
    }
  </List>
</div>*/

GloomhavenTracker.getInitialProps = function() {

};

const mapDispatchToProps = (dispatch) => {
  return {
    /*onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
    onChangeMonsters: event => dispatch(monstersUpdated(event.target.value)),
    onChangeScenarioNumber: event => dispatch(scenarioNumberSelected(event.target.value)),*/
  }
};

const mapStateToProps = createStructuredSelector({
  initiativeSortedClasses: selectClassesByInitiative,
  /*characterClasses: selectCharacterClasses(),
  monsterClasses: selectMonsterClasses(),
  scenarioNumber: selectScenarioNumber(),*/
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTracker);
