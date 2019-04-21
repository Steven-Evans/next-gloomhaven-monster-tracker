import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core";

const styles = theme => ({

});

class StatusEffectSelector extends React.Component {
  render() {
    const {
      classes,
      statusEffects,
      handleStatusToggle,
    } = this.props;

    return (
      <Grid container spacing={8}>
        {
          Object.entries(statusEffects).map((effect) => (
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
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
