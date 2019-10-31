import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';



const AddTraining = (props) => {

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
        setCustomers(responseData.content)
    })
   };

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

const [open, setOpen] = useState(false);
const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: ''});
const [customers, setCustomers] = useState([]);
const classes = useStyles();


const handleClickOpen = () => {
    setOpen(true);
  };

 const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  const handleChangeDate = (event) => {
    const newDate = event;
    setTraining({...training, date: newDate});
    console.log(training.date);
  }

  const addCTraining = () => { 
    props.saveTraining(training)
    
    handleClose();
    
    props.fetchTraining(); 
    setTraining({date: '', duration: '', activity: ''}) 
  }

    return (
        <div style={{margin: 10}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form in order to add a new Training.
          </DialogContentText>
          
          <DateTimePicker
          onChange={e => handleChangeDate(e)}
          name="date"
          value={training.date}
        />

           <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleChange(e)}
            label="activity"
            fullWidth
          />

<TextField
        id="standard-select-currency"
        select
        label="Select"
        name="customer"
        onClick={fetchCustomers}
        className={classes.textField}
        value={training.customer}
        onChange={e => handleChange(e)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select customer"
        margin="normal"
      >
        {customers.map((option) => (
          <MenuItem key={option.links[0].href} value={option.links[0].href}>
          {option.firstname} {option.lastname}
          </MenuItem>
        ))}
      </TextField>
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default AddTraining;