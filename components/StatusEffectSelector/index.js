import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  checkbox: {
    width: "36px",
    height: "36px",
  },
});

class StatusEffectSelector extends React.Component {
  render() {
    const {
      classes,
      isCharacter,
      statusEffects,
      handleStatusToggle,
    } = this.props;

    return (
      <Grid container spacing={8} direction="row">
        {
          Object.entries(statusEffects).map((effect) => (
            <Grid item xs={6} sm={3} md={isCharacter ? 6 : 3} lg={3} key={effect[0]}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={effect[1]}
                    onChange={handleStatusToggle(effect[0])}
                  />
                }
                label={effect[0].charAt(0).toUpperCase() + effect[0].slice(1)}
                labelPlacement="start"
              />
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(StatusEffectSelector);
