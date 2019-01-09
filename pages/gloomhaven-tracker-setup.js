import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { characterClasses } from '../utils/constants.js';
import {
  selectCharacterClasses,
  selectMonsterClasses,
  selectScenario,
  charactersUpdated,
} from "../reducers/gloomhaven-tracker-setup";

const GloomhavenTrackerSetup = (props) => (
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
);

GloomhavenTrackerSetup.getInitialProps = function({store, isServer, pathname, query}) {
  console.log("args", arguments);
  store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
  return {custom: 'custom'}; // you can pass some custom props to component from here
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
  }
}

const mapStateToProps = createStructuredSelector({
  characterClasses: selectCharacterClasses(),
  monsterClasses: selectMonsterClasses(),
  scenario: selectScenario(),
});

export default connect(mapStateToProps, mapDispatchToProps)(GloomhavenTrackerSetup);
