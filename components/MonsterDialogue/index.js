import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  buttonContainer: {
    textAlign: "center",
  },
  dialogGrid: {
    margin: 0,
    width: "100%",
  },
  dialogTitle: {
    paddingBottom: 0,
  },
  eliteLabel: {
    paddingLeft: theme.spacing.unit * 3,
  },
});

class MonsterDialogue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elite: false,
    }
  }

  static standeesToArray = num => {
    const tokens = [];
    for (let i = 1; i <= num; i++) {
      tokens.push(i.toString());
    }
    return tokens;
  };

  handleEliteToggle = (event) => {
    this.setState({ elite: event.target.checked})
  };

  render() {
    const {
      classes,
      dialogTitle,
      oozeSplitting,
      numberOfMaxStandees,
      onSelectStandee,
      activeStandees,
      ...other
    } = this.props;

    return (
      <Dialog
        aria-labelledby="dialog-title"
        {...other}>
        <Grid container spacing={16} className={classes.dialogGrid}>
          <Grid item xs={12}>
            <DialogTitle id="dialog-title" className={classes.dialogTitle}>{dialogTitle}</DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.eliteLabel}
              control={
                <Checkbox
                  checked={this.state.elite}
                  onChange={this.handleEliteToggle}
                  disabled={oozeSplitting || false}
                  color="primary"
                />
              }
              label="Elite"
            />
          </Grid>
          <Grid container spacing={32} item className={classes.dialogGrid} justify={"center"}>
            {
              MonsterDialogue.standeesToArray(numberOfMaxStandees).map((standee) => (
                <Grid item xs={4} key={standee} className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={onSelectStandee(standee, this.state.elite)}
                    disabled={!!activeStandees.find(active => standee === active)}
                  >
                    { standee }
                  </Button>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MonsterDialogue);
