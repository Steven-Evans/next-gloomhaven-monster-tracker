import React from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClassCard from '../ClassCard/index';
import { createStructuredSelector } from "reselect";
import NumberTextField from "../NumberTextField";
import {
  selectMonster,
  updateMonsterInitiative,
} from "../../reducers/gloomhaven-tracker";
import { selectScenarioLevel } from "../../reducers/gloomhaven-tracker-setup";
import monsterStats from "../../utils/monster_stats";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
  statLine: {
    width: "100%",
  },
  statsTypography: {

  },
  statsValue: {

  }
});

class MonsterCard extends React.Component {

  render () {
    const {
      classes,
      name,
      monster,
      scenarioLevel,
      ...props
    } = this.props;

    const stats = monsterStats.monsters[name].level[scenarioLevel];
    const uppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <ClassCard>
        <Grid container direction="row" spacing={24} >
          <Grid container item xs={6} md={3}>
            <Grid item xs={12}>
              <Typography noWrap variant="h5">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" className={classes.button}>
                New Monster
              </Button>x
            </Grid>
          </Grid>
          <Grid container item xs={6} md={3}>
            <Grid item xs={4}>
              <Typography noWrap variant="subtitle1">
                Initiative:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NumberTextField
                min={0}
                max={99}
                value={monster.initiative}
                onChange={props.onUpdateInitiative}
              />
            </Grid>
          </Grid>
          {
            ["normal", "elite"].map((type) => (
              <Grid container item xs={6} md={3}>
                <Typography variant="h6">
                  { uppercase(type) }
                </Typography>
                <Grid container justify="space-between">
                  {
                    Object.entries(stats[type]).map((stat) => (
                      <React.Fragment key={stat[0]}>
                        <Grid item xs={6}>
                          <Typography className={classes.statsTypography}>
                            { uppercase(stat[0]) }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {
                            Array.isArray(stat[1]) ? stat[1].map((attribute) => (
                              <Typography className={classes.statsTypography}>
                                { attribute }
                              </Typography>
                            )) : (
                              <Typography className={classes.statsTypography}>
                                { stat[1] }
                              </Typography>
                            )
                          }
                        </Grid>
                      </React.Fragment>
                    ))
                  }
                </Grid>
              </Grid>
            ))
          }
        </Grid>
      </ClassCard>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  monster: selectMonster(ownProps.name),
  scenarioLevel: selectScenarioLevel,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const name = ownProps.name;
  return {
    onUpdateInitiative: (event) => dispatch(updateMonsterInitiative(name, event.target.value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MonsterCard));
