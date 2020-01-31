import React from 'react';
import {logLinkClick} from '../utils/analytics';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconLink from "../components/IconLink";

const styles = theme => ({
  welcome: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: `${theme.spacing.unit * 2}px`,
      maxWidth: "95%",
    },
    maxWidth: "70%",
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
});

const Index = (props) => (
  <Grid container spacing={24} direction="column" justify={"center"} className={props.classes.welcome}>
    <Grid item xs={12}>
      <Typography variant="h2">Welcome!</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1" gutterBottom>
        This is my homepage! I'm not going to spend a whole bunch of time on it since my main focus is the Gloomhaven Tracker portion of the site, at least for now. I'm also looking for work so if you're in Vancouver BC and hiring for a software developer, give me a holler if you'd like to chat. So while it's not the flashiest thing in the world, check out my Github and see what I've done.
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <IconLink iconName="alpha-g-box" alt="Just a G" link="/gloomhaven-tracker-setup">
        Gloomhaven Tracker
      </IconLink>
      <IconLink onClick={logLinkClick('github')} iconName="github-box" alt="Github Icon" link="https://www.github.com/steven-evans">
        Github
      </IconLink>
      <IconLink onClick={logLinkClick('linkedIn')} iconName="linkedin-box" alt="LinkedIn Icon" link="https://www.linkedin.com/in/steven-evans-a8459b67/">
        LinkedIn
      </IconLink>
    </Grid>
  </Grid>
);

Index.getInitialProps = async function() {

};

export default withStyles(styles)(Index);
