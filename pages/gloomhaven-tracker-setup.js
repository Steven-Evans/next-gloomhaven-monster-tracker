import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { characterClasses } from '../utils/constants.js';
import {
  selectCharacterClasses,
  selectMonsterClasses,
  selectScenario,
} from "../reducers/gloomhaven-tracker-setup";

const GloomhavenTrackerSetup = (props) => (
  <TextField
//    className={classes.textField}
    select
    label="Select your character classes"
    value={props.characterClasses}
    variant="filled"
    //margin="normal"
  >
    {
      characterClasses.map(characterClass => (
        <MenuItem key={characterClass.nickname} value={characterClass.nickname}>
          {characterClass.name ? characterClass.name : characterClass.nickname}
        </MenuItem>
      ))
    }
  </TextField>
);

GloomhavenTrackerSetup.getInitialProps = function({store, isServer, pathname, query}) {
  console.log("args", arguments);
  store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
  return {custom: 'custom'}; // you can pass some custom props to component from here
};

const mapStateToProps = createStructuredSelector({
  characterClasses: selectCharacterClasses(),
  monsterClasses: selectMonsterClasses(),
  scenario: selectScenario(),
});

export default connect(mapStateToProps)(GloomhavenTrackerSetup);
