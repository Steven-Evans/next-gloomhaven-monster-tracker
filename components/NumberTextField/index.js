import TextField from '@material-ui/core/TextField'
import React from "react";

class NumberTextField extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentNumber: this.props.value,
    }
  }

  handleOnChange (event) {
    this.handlePreviousNumber(event);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handlePreviousNumber (event) {
    const eventVal = event.target.value;
    if (!!eventVal.toString().match(/(^[0]$|^[1-9][0-9]*$|^$)/) && (eventVal >= this.props.min && eventVal <= this.props.max || eventVal === "")) {
      this.setState({currentNumber: eventVal});
    } else {
      event.target.value = this.state.currentNumber;
    }
  }

  render () {
    const { min, max, ...other } = this.props;

    return (
      <TextField
        { ...other }
        type="tel"
        inputProps={{ min, max }}
        onChange={this.handleOnChange.bind(this)}
        margin="none"
      />
    );
  }
}

export default NumberTextField;
