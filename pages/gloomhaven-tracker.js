import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { characterClasses } from '../utils/constants.js';

export default () => (
  <TextField
//    className={classes.textField}
    select
    label="Select your character classes"
    value={this.state.characterChoice}
    variant="filled"
    //margin="normal"
  >
    {
      characterClasses.map(characterClass => (
        <MenuItem key={characterClass.nickname} value={characterClass.nickname}>
          {characterClass.name ? characterClass.name : characterClass.nickname}
        </MenuItem>
      ))
    }
  </TextField>
);