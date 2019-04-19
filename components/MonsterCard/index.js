import React from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClassCard from '../ClassCard/index';
import {createStructuredSelector} from "reselect";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
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
  margin: {
    margin: theme.spacing.unit,
  },
});

class MonsterCard extends React.Component {

  render () {
    const { name, classes, ...other } = this.props;

    return (
      <ClassCard>
        <Grid container direction="row" spacing={24} >
          <Grid container item xs={3}>
            <Grid item xs={12}>
              <Typography noWrap variant="h5">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" className={classes.button}>
                New Monster
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={3}>
            init
          </Grid>
          <Grid container item xs={6}>
            stats
          </Grid>
        </Grid>
      </ClassCard>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /*onChangeClasses: event => dispatch(charactersUpdated(event.target.value)),
    onChangeMonsters: event => dispatch(monstersUpdated(event.target.value)),
    onChangeScenarioNumber: event => dispatch(scenarioNumberSelected(event.target.value)),*/
  }
};

const mapStateToProps = createStructuredSelector({
  //initiativeSortedClasses: selectClassesByInitiative,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MonsterCard));
