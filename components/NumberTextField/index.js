import TextField from '@material-ui/core/TextField'
import React from "react";

class NumberTextField extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentNumber: 0,
    }
  }

  handleOnChange (event) {
    this.handlePreviousNumber(event);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handlePreviousNumber (event) {
    if (event.target.value < this.props.min || event.target.value > this.props.max) {
      event.target.value = this.state.currentNumber;
    } else {
      this.state.currentNumber = event.target.value;
    }
  }

  render () {
    const { min, max, ...other } = this.props;

    return (
      <TextField
        { ...other }
        inputProps={{ min, max }}
        onChange={this.handleOnChange.bind(this)}
        type="number"
        //      className={classes.textField}
        /*      InputLabelProps={{
                shrink: true,
              }}*/
        margin="normal"
      />
    );
  }
}

export default NumberTextField;
