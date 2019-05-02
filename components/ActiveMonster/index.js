import React from "react";
import {withStyles} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import StatusEffectSelector from "../StatusEffectSelector/index";
import NumberTextFieldStepper from "../NumberTextFieldStepper";

const styles = theme => ({
  healthTypography: {
    textAlign: "right",
  },
  iconButton: {
    //textAlign: 'center',
    color: theme.palette.primary.dark,
  },
});

class ActiveMonster extends React.Component {

  render() {
    const {
      classes,
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
            <Typography variant="subtitle1" className={classes.healthTypography}>
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
        <Grid item xs={1}>
          <IconButton className={classes.iconButton} onClick={props.onMonsterKilled}>
            <Cancel />
          </IconButton>
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
