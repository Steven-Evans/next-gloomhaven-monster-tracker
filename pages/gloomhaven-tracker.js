import React from "react";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  charactersUpdated,
  monstersUpdated,
  scenarioNumberSelected,
  selectCharacterClasses, selectMonsterClasses, selectScenarioNumber
} from "../reducers/gloomhaven-tracker-setup";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const GloomhavenTracker = (props) => {
  return (
    <div>
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
    </div>
  );
};

GloomhavenTracker.getInitialProps = function() {

};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
    onChangeMonsters: event => dispatch(monstersUpdated(event.target.value)),
    onChangeScenarioNumber: event => dispatch(scenarioNumberSelected(event.target.value)),
  }
};

const mapStateToProps = createStructuredSelector({
  characterClasses: selectCharacterClasses(),
  monsterClasses: selectMonsterClasses(),
  scenarioNumber: selectScenarioNumber(),
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTracker);
