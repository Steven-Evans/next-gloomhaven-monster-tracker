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
  makeSelectSortedActiveMonsters,
  updateMonsterStatusEffect,
  updateMonsterInitiative,
  updateNewMonsterDialogue,
  updateMonsterHealth,
  incrementMonsterHealth,
  decrementMonsterHealth,
  deleteActiveMonster,
} from "../../reducers/gloomhaven-tracker";
import { selectScenarioLevel } from "../../reducers/gloomhaven-tracker-setup";
import monsterStats from "../../utils/monster_stats";
import ActiveMonster from "../ActiveMonster";

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
      sortedMonsters,
      ...props
    } = this.props;

    const stats = monsterStats.monsters[monster.name].level[scenarioLevel];
    const uppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <ClassCard>
        <Grid container direction="row" spacing={24} >
          <Grid container item xs={6} md={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {monster.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" className={classes.button} onClick={props.onClickNewMonster}>
                New Monster
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={6} md={3}>
            <Grid item xs={4}>
              <Typography variant="subtitle1">
                Initiative:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <NumberTextField
                min={0}
                max={99}
                value={monster && monster.initiative || 0}
                onChange={props.onUpdateInitiative}
              />
            </Grid>
          </Grid>
          {
            ["normal", "elite"].map((type) => (
              <Grid container item xs={6} md={3} key={type}>
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
                              <Typography className={classes.statsTypography} key={attribute}>
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
        {
          sortedMonsters.map(standee => (
            <ActiveMonster
              monsterName={name}
              standeeNumber={standee[0]}
              activeMonster={standee[1]}
              onUpdateStatusEffect={props.onUpdateStatusEffect}
              onIncrementHealth={props.onIncrementHealth(standee[0])}
              onDecrementHealth={props.onDecrementHealth(standee[0])}
              onUpdateHealth={props.onUpdateHealth(standee[0])}
              onMonsterKilled={props.onMonsterKilled(standee[0])}
              key={`${name}-${standee[0]}`}
            />
          ))
        }
      </ClassCard>
    );
  }
}

const makeMapStateToProps = (state, ownProps) => {
  const selectActiveMonsters = makeSelectSortedActiveMonsters(ownProps.name);

  const mapStateToProps = createStructuredSelector({
    monster: selectMonster(ownProps.name),
    scenarioLevel: selectScenarioLevel,
    sortedMonsters: selectActiveMonsters,
  });
  return mapStateToProps;
};



const mapDispatchToProps = (dispatch, ownProps) => {
  const name = ownProps.name;
  return {
    onUpdateInitiative: (event) => dispatch(updateMonsterInitiative(name, event.target.value)),
    onClickNewMonster: () => dispatch(updateNewMonsterDialogue(name, true)),
    onUpdateStatusEffect: (standeeNumber, effect) => (event) => dispatch(updateMonsterStatusEffect(name, standeeNumber, effect, event.target.checked)),
    onIncrementHealth: (standeeNumber) => () => dispatch(incrementMonsterHealth(standeeNumber, name)),
    onDecrementHealth: (standeeNumber) => () => dispatch(decrementMonsterHealth(standeeNumber, name)),
    onUpdateHealth: (standeeNumber) => (event) => dispatch(updateMonsterHealth(standeeNumber, name, event.target.value)),
    onMonsterKilled: (standeeNumber) => () => dispatch(deleteActiveMonster(standeeNumber, name)),
  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(styles)(MonsterCard));
