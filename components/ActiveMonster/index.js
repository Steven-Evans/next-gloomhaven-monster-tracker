import React from "react";
import {withStyles} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import StatusEffectSelector from "../StatusEffectSelector/index";
import NumberTextFieldStepper from "../NumberTextFieldStepper";

const styles = theme => ({
  monsterContainer: {
    borderLeftWidth: "medium",
    borderLeftStyle: "solid",
  },
  healthTypography: {
    textAlign: "right",
  },
  standeeTypography: {
    marginLeft: theme.spacing.unit,
  },
  iconContainer: {
    textAlign: "center",
  },
  iconButton: {
    color: theme.palette.primary.dark,
  },
  elite: {
    borderLeftColor: "gold",
  },
  normal: {
    borderLeftColor: "silver",
  },
});

class ActiveMonster extends React.Component {

  render() {
    const {
      classes,
      standeeNumber,
      activeMonster,
      ...props
    } = this.props;

    return (
      <Grid container spacing={8} alignItems="baseline" className={`${classes.monsterContainer} ${activeMonster.get('elite') ? classes.elite : classes.normal}`}>
        <Grid item xs={1}>
          <Typography variant={"h5"} className={classes.standeeTypography}>
            { standeeNumber }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={"subtitle1"}>
            { activeMonster.get('elite') ? "Elite" : "Normal" }
          </Typography>
        </Grid>
        <Grid container item xs={7} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.healthTypography}>
              Health:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <NumberTextFieldStepper
              min={0}
              max={999}
              value={activeMonster.get('currentHealth')}
              onIncrement={props.onIncrementHealth}
              onDecrement={props.onDecrementHealth}
              onChange={props.onUpdateHealth}
            />
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.iconContainer}>
          <IconButton className={classes.iconButton} onClick={props.onMonsterKilled}>
            <Cancel />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <StatusEffectSelector
            isCharacter={false}
            statusEffects={activeMonster.get('statusEffects')}
            handleStatusToggle={props.onUpdateStatusEffect.bind(null, standeeNumber)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ActiveMonster);
