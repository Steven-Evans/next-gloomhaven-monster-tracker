import React from "react";
import NumberTextField from "../NumberTextField";
import { withStyles } from "@material-ui/core/styles";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCharacter } from "../../redux/reducers/gloomhaven-tracker";

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
  icon: {
    //fontSize: 24,
  },
  iconButton: {
    //textAlign: 'center',
    color: theme.palette.primary.main,
    /*'&:hover': {
      color: theme.palette.primary.accent,
    },*/
  },
});

class NumberTextFieldStepper extends React.Component {
  render() {
    const {
      classes,
      onIncrement,
      onDecrement,
      ...other
    } = this.props;

    return (
      <Grid container spacing={8} justify="space-evenly" wrap="nowrap"  alignItems="center">
        <Grid item>
          <IconButton className={classes.iconButton} aria-label="Decrement" onClick={onDecrement}>
            <RemoveCircle className={classes.icon}/>
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <NumberTextField
            { ...other }
            //      className={classes.textField}
            /*      InputLabelProps={{
                    shrink: true,
                  }}*/
          />
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton} aria-label="Increment" onClick={onIncrement}>
            <AddCircle />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NumberTextFieldStepper);
