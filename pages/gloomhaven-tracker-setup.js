import Link from "next/link"
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NumberTextField from '../components/NumberTextField';
import { characterClasses } from '../utils/constants.js';
import {
  selectCharacterClasses,
  selectMonsterClasses,
  selectScenarioNumber,
  selectScenarioLevel,
  charactersUpdated,
  monstersUpdated,
  scenarioNumberUpdated,
  scenarioLevelUpdated,
  initializeTracker,
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
            <MenuItem key={characterClass.codename} value={characterClass.codename}>
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
      id="scenario-number"
      label="Scenario Number"
      value={props.scenarioNumber}
      onChange={props.onChangeScenarioNumber}
      min={1}
      max={95}
//      className={classes.textField}
/*      InputLabelProps={{
        shrink: true,
      }}*/
      margin="normal"
    />
    <NumberTextField
      id="scenario-level"
      label="Scenario Level"
      value={props.scenarioLevel}
      onChange={props.onChangeScenarioLevel}
      min={0}
      max={7}
      //      className={classes.textField}
      /*      InputLabelProps={{
              shrink: true,
            }}*/
      margin="normal"
    />
    <Link href="/gloomhaven-tracker">
      <Button
        type="button"
        onClick={props.onInitializeTracker(props)}>Submit</Button>
    </Link>
  </div>
);

GloomhavenTrackerSetup.getInitialProps = function() {
//  has args {store, isServer, pathname, query}
//  console.log("ARGS", arguments);
//  store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
//  return {custom: 'custom'}; // you can pass some custom props to component from here
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
    onChangeMonsters: event => dispatch(monstersUpdated(event.target.value)),
    onChangeScenarioNumber: event => dispatch(scenarioNumberUpdated(event.target.value)),
    onChangeScenarioLevel: event => dispatch(scenarioLevelUpdated(event.target.value)),
    onInitializeTracker: ({ characterClasses, monsterClasses, scenarioNumber, scenarioLevel }) => () => dispatch(initializeTracker({
      characterClasses,
      monsterClasses,
      scenarioNumber,
      scenarioLevel,
    })),
  };
};

const mapStateToProps = createStructuredSelector({
  characterClasses: selectCharacterClasses,
  monsterClasses: selectMonsterClasses,
  scenarioNumber: selectScenarioNumber,
  scenarioLevel: selectScenarioLevel,
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTrackerSetup);
