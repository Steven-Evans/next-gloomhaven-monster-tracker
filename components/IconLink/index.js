import React from "react";
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  main: {
    display: "flex",
    alignItems: "center",
    width: "max-content",
  },
  img: {
    padding: theme.spacing.unit,
  },
  typography: {
    padding: theme.spacing.unit,
  }
});

class IconLink extends React.Component {

  render() {
    const {
      classes,
      iconName,
      alt,
      link,
      children
    } = this.props;
    return (
      <a href={link} className={classes.main}>
        <img src={`/static/misc_icons/${iconName}.svg`} alt={alt}/>
        <Typography variant="body1" className={classes.typography}>
          {children}
        </Typography>
      </a>
    );
  }
}

export default withStyles(styles)(IconLink);