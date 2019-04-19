import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
});

class BossCard extends React.Component {

  render () {
    const { name, classes, ...other } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container direction="row" spacing={24} >
          <Grid container item xs={3}>
            <Grid item xs={12}>
              <Typography noWrap variant="h4">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <CardMedia
                className={classes.media}
                image="/static/char_icons/brute.png"
              />
            </Grid>
          </Grid>
          <Grid container item xs={3}>
            init
          </Grid>
          <Grid container item xs={6}>
            stats
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(BossCard);