import React, { usestate } from 'react';
import Carlist from './Carlist';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddCar = (props) => {

const [open, setOpen] = React.useState(false);
const [car, setCar] = React.useState({
brand: '', model: '', color: '', year: '', fuel: '', price: ''    
})

const handleClickOpen = () => {
    setOpen(true);
  };

 const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
    console.log(car)
  }

  const addCar = () => {
    props.saveCar(car)
    handleClose();
    setCar({brand: '', model: '', color: '', year: '', fuel: '', price: ''}) 
    /* Manuaalisesti resetoi staten, jotta ei tarjoa edellisiä arvoja formissa*/
  }
    return (
        <div style={{margin: 10}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add car
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form in order to add a new car.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={e => handleChange(e)}
            label="Brand"
            fullWidth
          />
           <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={e => handleChange(e)}
            label="Model"
            fullWidth
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={e => handleChange(e)}
            label="Color"
            fullWidth
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            onChange={e => handleChange(e)}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={e => handleChange(e)}
            label="Fuel"
            fullWidth
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={e => handleChange(e)}
            label="Price"
            fullWidth
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCar} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default AddCar;