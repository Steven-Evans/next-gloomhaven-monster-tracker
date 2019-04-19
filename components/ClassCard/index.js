import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
});

class ClassCard extends React.Component {

  render () {
    const { children, classes } = this.props;

    return (
      <Paper className={classes.paper}>
        {children}
      </Paper>
    );
  }
}

export default withStyles(styles)(ClassCard);
