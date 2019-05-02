import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({

});

class NewMonsterDialog extends React.Component {
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
      onSelectStandee,
      numberOfMaxStandees,
      activeStandees,
      selectedValue,
      ...other
    } = this.props;

    return (
      <Dialog aria-labelledby="new-monster-dialog-title" {...other}>
        <DialogTitle id="new-monster-dialog-title">Monster Number</DialogTitle>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.elite}
              onChange={this.handleEliteToggle}
              color="primary"
            />
          }
          label="Elite"
          labelPlacement="start"
        />
        <Grid container spacing={24}>
          {
            NewMonsterDialog.standeesToArray(numberOfMaxStandees).map((standee) => (
              <Grid item xs={4} key={standee}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={onSelectStandee(standee, this.state.elite)}
                  disabled={!!activeStandees.find(active => standee === active)}
                >
                  { standee }
                </Button>
              </Grid>
            ))
          }
        </Grid>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewMonsterDialog);
