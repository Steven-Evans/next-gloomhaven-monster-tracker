import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClassCard from "../ClassCard/index";
import NumberTextField from "../NumberTextField/index";
import {
  selectCharacters,
  selectMonsters,
  updateMonsterInitiative,
  updateCharacterInitiative
} from "../../reducers/gloomhaven-tracker";

const styles = theme => ({

});

class InitiativeInputCard extends React.Component {

  render() {
    const {
      classes,
      characters,
      monsters,
      ...props
    } = this.props;

    return (
      <ClassCard>
        <Typography variant="h5" gutterBottom>
          Input Initiative
        </Typography>
        <Grid container spacing={8}>
          {
            Object.entries(characters).concat(Object.entries(monsters)).map((monOrChar) => (
              <React.Fragment key={monOrChar[0]}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">
                    { monOrChar[1].name }
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <NumberTextField
                    min={0}
                    max={99}
                    value={monOrChar[1].initiative}
                    onChange={!monOrChar[1].active ? props.onUpdateCharacterInitiative(monOrChar[0]) : props.onUpdateMonsterInitiative(monOrChar[0])}
                  />
                </Grid>
              </React.Fragment>
            ))
          }
        </Grid>
      </ClassCard>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCharacterInitiative: (name) => (event) => dispatch(updateCharacterInitiative(name, event.target.value)),
    onUpdateMonsterInitiative: (name) => (event) => dispatch(updateMonsterInitiative(name, event.target.value)),
  }
};

const mapStateToProps = createStructuredSelector({
  characters: selectCharacters,
  monsters: selectMonsters,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InitiativeInputCard));
