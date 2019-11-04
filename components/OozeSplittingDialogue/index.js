import React from "react";
import MonsterDialogue from "../MonsterDialogue";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {
  selectTempOozes,
  selectOozeSplits,
  selectOozeOpen,
} from "../../redux/reducers/gloomhaven-tracker";
import {
  chooseOozeSplitStandee,
  closeOozeDialogue,
} from "../../redux/actions/gloomhaven-tracker";
import {selectScenarioLevel} from "../../redux/reducers/gloomhaven-tracker-setup";

class OozeSplittingDialogue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onSelectStandee,
      activeOozes,
      scenarioLevel,
      oozeSplits,
      oozeDialogueOpen,
      onOozeDialogueClose,
    } = this.props;

    return (
      <MonsterDialogue
        dialogTitle={`Splitting Ooze ${oozeSplits.first()}`}
        open={oozeDialogueOpen}
        eliteDisabled={true}
        numberOfMaxStandees={10}
        onSelectStandee={onSelectStandee.bind(null, scenarioLevel, oozeSplits.first())}
        activeStandees={activeOozes.keySeq()}
        onClose={onOozeDialogueClose}
      />
    );
  }

}

const mapStateToProps = createStructuredSelector({
  activeOozes: selectTempOozes,
  oozeSplits: selectOozeSplits,
  oozeDialogueOpen: selectOozeOpen,
  scenarioLevel: selectScenarioLevel,
});


const mapDispatchToProps = (dispatch) => {
  return {
    onSelectStandee: (scenarioLevel, splitter, splittee, elite) => () => dispatch(chooseOozeSplitStandee(splitter, splittee, elite, scenarioLevel)),
    onOozeDialogueClose: () => dispatch(closeOozeDialogue())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OozeSplittingDialogue);
