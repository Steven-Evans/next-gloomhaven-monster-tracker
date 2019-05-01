import React from "react";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StatusEffectSelector from "../StatusEffectSelector/index";
import NumberTextFieldStepper from "../NumberTextFieldStepper";

const styles = theme => ({

});

class ActiveMonster extends React.Component {

  render() {
    const {
      monsterName,
      standeeNumber,
      activeMonster,
      ...props
    } = this.props;

    return (
      <Grid container spacing={24} alignItems="baseline">
        <Grid item xs={1}>
          <Typography variant={"h5"}>
            { standeeNumber }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={"subtitle1"}>
            { activeMonster.elite ? "Elite" : "Normal" }
          </Typography>
        </Grid>
        <Grid container item xs={8} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="subtitle1" align="right">
              Health:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <NumberTextFieldStepper
              min={0}
              max={999}
              value={activeMonster.currentHealth}
              onIncrement={props.onIncrementHealth}
              onDecrement={props.onDecrementHealth}
              onChange={props.onUpdateHealth}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <StatusEffectSelector
            isCharacter={false}
            statusEffects={activeMonster.statusEffects}
            handleStatusToggle={props.onUpdateStatusEffect.bind(null, monsterName, standeeNumber)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ActiveMonster);
