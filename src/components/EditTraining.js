import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const EditTraining = (props) => {

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
        setCustomers(responseData.content)
    console.log(customers)
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


const [open, setOpen] = React.useState(false);
const [training, setTraining] = React.useState({ date: '', duration: '', activity: '', customer: ''  })
const [customers, setCustomers] = useState([]);
const classes = useStyles();
var editlink = 'https://customerrest.herokuapp.com/api/trainings/'

const handleClickOpen = () => {
  console.log(editlink + props.training.id)
  setTraining({date: props.training.date, duration: props.training.duration, activity: props.training.activity, customer: props.training.customer})
  fetchCustomers();
    setOpen(true);
  };

 const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
    console.log(training)
    
  }

  const updateTraining = () => {
   props.updateTraining(editlink + props.training.id, training)
   handleClose();
  }
    return (
        <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the information for excisting training.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleChange(e)}
            label="Date"
            fullWidth
          />

          <TextField
            autoFocus
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
            label="Activity"
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
          <Button onClick={updateTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default EditTraining;