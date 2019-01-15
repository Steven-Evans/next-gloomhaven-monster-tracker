import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NumberTextField from '../components/NumberTextField'
import { characterClasses } from '../utils/constants.js';
import {
  selectCharacterClasses,
  selectMonsterClasses,
  selectScenarioNumber,
  charactersUpdated,
  monstersUpdated,
  scenarioNumberSelected,
} from "../reducers/gloomhaven-tracker-setup";
import monsterStats from "../utils/monster_stats"

const monsterClasses = Object.keys(monsterStats.monsters).concat(Object.keys(monsterStats.bosses));

const GloomhavenTrackerSetup = (props) => (
  <div>
    <FormControl>
      <InputLabel htmlFor="select-character-classes">Select your character classes</InputLabel>
      <Select
    //  className={classes.textField}
        multiple
        value={props.characterClasses}
    //    variant="filled"
        onChange={props.onChangeClasses}
        input={<Input id="select-character-classes" />}
    //  margin="normal"
        renderValue={selected => (
    //      <div className={classes.chips}>
          <div >
            {selected.map(value => (
    //          <Chip key={value} label={value} className={classes.chip} />
              <Chip key={value} label={value}/>
            ))}
          </div>
        )}
      >
        {
          characterClasses.map(characterClass => (
            <MenuItem key={characterClass.nickname} value={characterClass.nickname}>
              {characterClass.name ? characterClass.name : characterClass.nickname}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="select-monster-classes">Select the monster classes</InputLabel>
      <Select
        multiple
        value={props.monsterClasses}
        onChange={props.onChangeMonsters}
        input={<Input id="select-monster-classes" />}
        renderValue={selected => (
          <div >
            {selected.map(value => (
              <Chip key={value} label={value}/>
            ))}
          </div>
        )}
      >
        {
          monsterClasses.map(monsterClass => (
            <MenuItem key={monsterClass} value={monsterClass}>
              {monsterClass}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
    <NumberTextField
      id="standard-number"
      label="Scenario Number"
      value={props.scenarioNumber}
      onChange={props.onChangeScenarioNumber}
      min={0}
      max={95}
      type="number"
//      className={classes.textField}
/*      InputLabelProps={{
        shrink: true,
      }}*/
      margin="normal"
    />
  </div>
);

GloomhavenTrackerSetup.getInitialProps = function({store, isServer, pathname, query}) {
  console.log("args", arguments);
  store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
  return {custom: 'custom'}; // you can pass some custom props to component from here
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
    onChangeMonsters: event => dispatch(monstersUpdated(event.target.value)),
    onChangeScenarioNumber: event => dispatch(scenarioNumberSelected(event.target.value)),
  }
}

const mapStateToProps = createStructuredSelector({
  characterClasses: selectCharacterClasses(),
  monsterClasses: selectMonsterClasses(),
  scenarioNumber: selectScenarioNumber(),
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTrackerSetup);
