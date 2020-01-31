import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClassCard from "../ClassCard";
import Button from "@material-ui/core/Button";
import NumberTextField from "../NumberTextField";
import ActiveMonster from "../ActiveMonster";
import {getBossStats} from "../../utils/monster";
import {connect} from "react-redux";
import {makeSelectSortedActiveMonsters, selectMonster, selectCharacters} from "../../redux/reducers/gloomhaven-tracker";
import {selectScenarioLevel} from "../../redux/reducers/gloomhaven-tracker-setup";
import {createStructuredSelector} from "reselect";
import {
  decrementMonsterHealth, deleteActiveMonster,
  incrementMonsterHealth, updateMonsterHealth,
  updateMonsterInitiative,
  updateMonsterStatusEffect,
  updateNewBossDialogue
} from "../../redux/actions/gloomhaven-tracker";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  card: {
    maxWidth: 400,
  },
  media: {
//    width: 80px,
    height: 0,
    paddingTop: '80%',
  },
  actions: {
    display: 'flex',
  },
  consumeDark: {
    paddingRight: '.2em',
    verticalAlign: 'middle',
    height: '1.75em',
  },
  consumeLight: {
    paddingRight: '.2em',
    verticalAlign: 'middle',
    height: '1.75em',
  },
  elderDrakeSpecial1Area: {
    verticalAlign: 'middle',
    height: '5em',
  },
  inoxBodyguardSpecial1Area: {
    verticalAlign: 'middle',
    height: '3.75em',
  },
  sightlessEyeSpecial1Area: {
    verticalAlign: 'middle',
    height: '5em',
  },
  sightlessEyeSpecial2Area: {
    verticalAlign: 'middle',
    height: '5em',
  },
  statsTypography: {

  },
  abilityTypography: {
    display: 'inline',
    verticalAlign: 'middle',
  },
  specialAbility: {
    display: 'inline',
  },
  statsTitle: {
    lineHeight: '1.25em'
  }
});

class BossCard extends React.Component {
  constructor(props) {
    super(props);

    this.bossStats = getBossStats(props.boss.get('name'), props.scenarioLevel, props.characters.size);
  }

  render () {
    const {
      name,
      classes,
      boss,
      sortedBosses,
      ...props
    } = this.props;

    return (
      <ClassCard>
        <Grid container direction="row" spacing={24} >
          <Grid item xs={6} lg={3}>
            <Grid container direction="column" spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {boss.get('name')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" className={classes.button} onClick={props.onClickNewBoss}>
                  New Boss
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Grid container direction="row" spacing={24}>
              <Grid item xs={5}>
                <Typography variant="subtitle1">
                  Initiative:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <NumberTextField
                  min={0}
                  max={99}
                  value={boss.get('initiative')}
                  onChange={props.onUpdateInitiative}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="subtitle1" className={classes.statsTitle}>
                  Stats:
                </Typography>
              </Grid>
              <Grid container direction="column" item xs={4}>
                <Grid item>
                  <Typography className={classes.statsTypography}>Health</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>Move</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>Attack</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>Range</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column" item xs={3}>
                <Grid item>
                  <Typography className={classes.statsTypography}>{this.bossStats.health}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>{this.bossStats.move}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>{this.bossStats.attack}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.statsTypography}>{this.bossStats.range}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {
            [
              ["special1", "Special 1"],
              ["special2", "Special 2"],
            ].map((specialAbility) => (
              <Grid item xs={4} lg={2} key={specialAbility[0]}>
                <Grid container direction={"column"}>
                  <Grid item xs>
                    <Typography variant="h6">{specialAbility[1]}</Typography>
                  </Grid>
                  {
                    this.bossStats[specialAbility[0]].map((ability, index) => {
                      return (
                        <Grid item key={index} style={{ flexShrink: 1 }}>
                          {
                            ability.match(/{{(.*)}}/) ?
                              <Grid container direction={"row"} className={classes.specialAbility}>

                                  <Typography className={classes.abilityTypography}>
                                    {ability.split(/{{(.*)}}/)[0]}
                                  </Typography>
                                  <img
                                    className={classes[ability.split(/{{(.*)}}/)[1].split(/\.[^.]+$/)[0].split('/').reverse()[0]]}
                                     src={ability.split(/{{(.*)}}/)[1]} />
                                  <Typography className={classes.abilityTypography}>
                                    {ability.split(/{{(.*)}}/)[2]}
                                  </Typography>
                              </Grid> :
                              <Typography className={classes.abilityTypography}>{ ability }</Typography>
                          }
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
            ))
          }
          <Grid item xs={4} lg={2}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">Immunities</Typography>
              </Grid>
              <Grid item>
                {
                  this.bossStats.immunities.map((immunity) => (
                    <Typography className={classes.statsTypography} key={immunity}>
                      {immunity}
                    </Typography>
                  ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {
          sortedBosses.map(standee => (
            <ActiveMonster
              standeeNumber={standee[0]}
              activeMonster={standee[1]}
              isBoss={true}
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
  const selectActiveBosses = makeSelectSortedActiveMonsters(ownProps.name);

  const mapStateToProps = createStructuredSelector({
    boss: selectMonster(ownProps.name),
    sortedBosses: selectActiveBosses,
    scenarioLevel: selectScenarioLevel,
    characters: selectCharacters,
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const name = ownProps.name;
  return {
    onUpdateInitiative: (event) => dispatch(updateMonsterInitiative(name, event.target.value)),
    onClickNewBoss: () => dispatch(updateNewBossDialogue(name, true)),
    onUpdateStatusEffect: (standeeNumber, effect) => (event) => dispatch(updateMonsterStatusEffect(name, standeeNumber, effect, event.target.checked)),
    onIncrementHealth: (standeeNumber) => () => dispatch(incrementMonsterHealth(standeeNumber, name)),
    onDecrementHealth: (standeeNumber) => () => dispatch(decrementMonsterHealth(standeeNumber, name)),
    onUpdateHealth: (standeeNumber) => (event) => dispatch(updateMonsterHealth(standeeNumber, name, event.target.value)),
    onMonsterKilled: (standeeNumber) => () => dispatch(deleteActiveMonster(standeeNumber, name)),

  }
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(styles)(BossCard));