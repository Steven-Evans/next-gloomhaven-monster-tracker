import Link from "next/link"
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import NumberTextField from '../components/NumberTextField';
import { characterClasses, monsterClasses } from '../utils/constants.js';
import {
  selectCharacterClasses,
  selectMonsterClasses,
  selectScenarioNumber,
  selectScenarioLevel,
  selectCharacterClassesError,
  selectMonsterError,
  selectScenarioLevelError, selectSubmitClean,
} from "../redux/reducers/gloomhaven-tracker-setup";
import {
  charactersUpdated,
  initializeTracker, monstersUpdated,
  scenarioLevelUpdated,
  scenarioNumberUpdated
} from "../redux/actions/gloomhaven-tracker-setup";

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  numberTextField: {
    width: '100%',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "25%",
  }
});

const GloomhavenTrackerSetup = (props) => (
  <Grid container spacing={24} className={props.classes.heroContent} justify={"center"}>
    <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
        Create a Gloomhaven Monster Tracker session by filling in which classes you are playing, one of filling in the monsters or the scenario number, and the scenario level/difficulty for monster stats then hit the Submit button.
      </Typography>

      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          When you've created a session, use the sharable URL (the idea is to be similar to Jackbox) and give it to your buddies so they can also pull out their phones and track their character stats and monsters from their seat.
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <FormControl error={props.errorCharacterClasses} fullWidth>
        <InputLabel htmlFor="select-character-classes">Select your character classes</InputLabel>
        <Select
          multiple
          value={props.characterClasses.toArray()}
          onChange={props.onChangeClasses}
          input={<Input id="select-character-classes" />}
          renderValue={selected => (
            <div>
              {selected.map(value => (
                <Chip key={value} label={value} className={props.classes.chip} />
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
    </Grid>
    <Grid item xs={12}>
      <FormControl error={props.errorMonsterClasses} fullWidth>
        <InputLabel htmlFor="select-monster-classes">Select the monster classes</InputLabel>
        <Select
          multiple
          value={props.monsterClasses.toArray()}
          onChange={props.onChangeMonsters}
          input={<Input id="select-monster-classes" />}
          renderValue={selected => (
            <div >
              {selected.map(value => (
                <Chip key={value} label={value} className={props.classes.chip}/>
              ))}
            </div>
          )}
        >
          {
            monsterClasses.map(monsterClass => (
              <MenuItem key={monsterClass.codename} value={monsterClass.codename}>
                {monsterClass.name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <NumberTextField
        id="scenario-number"
        label="Scenario Number"
        value={props.scenarioNumber}
        onChange={props.onChangeScenarioNumber}
        min={1}
        max={95}
        error={props.errorMonsterClasses}
        className={props.classes.numberTextField}
      />
    </Grid>
    <Grid item xs={6}>
      <NumberTextField
        id="scenario-level"
        label="Scenario Level"
        value={props.scenarioLevel}
        onChange={props.onChangeScenarioLevel}
        min={0}
        max={7}
        error={props.errorScenarioLevel}
        className={props.classes.numberTextField}
      />
    </Grid>
    <Grid item xs={12} className={props.classes.buttonContainer}>
      <Link href="/gloomhaven-tracker">
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={props.classes.button}
          disabled={props.submitClean}
          onClick={props.onInitializeTracker(props)}>Submit</Button>
      </Link>
    </Grid>
  </Grid>
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
  errorCharacterClasses: selectCharacterClassesError,
  errorMonsterClasses: selectMonsterError,
  errorScenarioLevel: selectScenarioLevelError,
  submitClean: selectSubmitClean,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GloomhavenTrackerSetup));
