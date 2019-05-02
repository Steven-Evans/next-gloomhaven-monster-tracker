import React from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ClassCard from "../ClassCard/index";
import NumberTextField from "../NumberTextField/index";
import NumberTextFieldStepper from "../NumberTextFieldStepper/index";
import StatusEffectSelector from "../StatusEffectSelector/index";
import { characterClasses } from "../../utils/constants";
import { createStructuredSelector } from "reselect";
import {
  updateCharacterExperience,
  incrementCharacterExperience,
  decrementCharacterExperience,
  updateCharacterHealth,
  incrementCharacterHealth,
  decrementCharacterHealth,
  updateCharacterInitiative,
  updateCharacterStatusEffect,
  selectCharacter,
} from "../../reducers/gloomhaven-tracker";

const styles = theme => ({
  media: {
    width: '6em',
    height: 0,
    paddingTop: '90%',
    marginLeft: '-1em',
  },
  actions: {
    display: 'flex',
  },
});

class CharacterCard extends React.Component {

  render () {
    const {
      classes,
      name,
      character,
      ...props
    } = this.props;

    const nickname = characterClasses.find((character) => character.codename === name).nickname;
    const imagePath = `/static/char_icons/${name}.png`;

    return (
      <ClassCard>
        <Grid container direction="row" spacing={24} >
          <Grid container item xs={4} md={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {nickname}
              </Typography>
            </Grid>
            <Grid item>
              <CardMedia
                className={classes.media}
                image={imagePath}
              />
            </Grid>
          </Grid>
          <Grid container item xs={8} md={4} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="subtitle1">
                Initiative:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NumberTextField
                min={0}
                max={99}
                value={character.initiative}
                onChange={props.onUpdateInitiative}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1">
                Health:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NumberTextFieldStepper
                min={0}
                max={99}
                value={character.currentHealth}
                onIncrement={props.onIncrementHealth}
                onDecrement={props.onDecrementHealth}
                onChange={props.onUpdateHealth}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1">
                Experience:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NumberTextFieldStepper
                min={0}
                max={99}
                value={character.experience}
                onIncrement={props.onIncrementExperience}
                onDecrement={props.onDecrementExperience}
                onChange={props.onUpdateExperience}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6}>
            <StatusEffectSelector
              isCharacter={true}
              statusEffects={character.statusEffects}
              handleStatusToggle={props.onUpdateStatusEffect.bind(null, name)}
            />
          </Grid>
        </Grid>
      </ClassCard>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  character: selectCharacter(ownProps.name),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const name = ownProps.name;
  return {
    onIncrementHealth: () => dispatch(incrementCharacterHealth(name)),
    onDecrementHealth: () => dispatch(decrementCharacterHealth(name)),
    onUpdateHealth: (event) => dispatch(updateCharacterHealth(name, event.target.value)),
    onIncrementExperience: () => dispatch(incrementCharacterExperience(name)),
    onDecrementExperience: () => dispatch(decrementCharacterExperience(name)),
    onUpdateExperience: (event) => dispatch(updateCharacterExperience(name, event.target.value)),
    onUpdateInitiative: (event) => dispatch(updateCharacterInitiative(name, event.target.value)),
    onUpdateStatusEffect: (name, effect) => (event) => dispatch(updateCharacterStatusEffect(name, effect, event.target.checked)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CharacterCard));
