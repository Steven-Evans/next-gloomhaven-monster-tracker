import React from 'react';
import {connect} from "react-redux";
import MonsterDialog from "../MonsterDialogue/index";
import {createMonster, updateNewMonsterDialogue} from "../../redux/actions/gloomhaven-tracker";
import {createStructuredSelector} from "reselect";
import {
  selectActiveStandees,
  selectNewMonsterDialogueOpen,
  selectNewMonsterType,
  selectEliteDisabled,
} from "../../redux/reducers/gloomhaven-tracker";
import {selectScenarioLevel} from "../../redux/reducers/gloomhaven-tracker-setup";
import {monsterClasses} from "../../utils/constants";

class NewMonsterDialogue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      activeStandees,
      newMonsterType,
      scenarioLevel,
      newMonsterDialogueOpen,
      onSelectStandee,
      onNewMonsterDialogueClose,
      eliteDisabled,
    } = this.props;
    const numMaxStandees = newMonsterType && monsterClasses.find((monster) => monster.codename === newMonsterType).max;

    return (
      <MonsterDialog
        dialogTitle="Select Standee Number"
        open={newMonsterDialogueOpen}
        eliteDisabled={eliteDisabled}
        numberOfMaxStandees={numMaxStandees}
        onSelectStandee={onSelectStandee.bind(null, newMonsterType, scenarioLevel)}
        activeStandees={activeStandees}
        onClose={onNewMonsterDialogueClose(newMonsterType)}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectStandee: (monsterType, scenarioLevel, standee, elite) => () => dispatch(createMonster(standee, monsterType, elite, scenarioLevel)),
    onNewMonsterDialogueClose: (monsterType) => () => dispatch(updateNewMonsterDialogue(monsterType, false)),
  }
};

const mapStateToProps = createStructuredSelector({
  newMonsterDialogueOpen: selectNewMonsterDialogueOpen,
  newMonsterType: selectNewMonsterType,
  scenarioLevel: selectScenarioLevel,
  activeStandees: selectActiveStandees,
  eliteDisabled: selectEliteDisabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMonsterDialogue);
