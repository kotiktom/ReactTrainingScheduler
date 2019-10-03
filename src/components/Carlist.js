import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';
import { blue, yellow } from '@material-ui/core/colors';
import color from '@material-ui/core/colors/brown';
import { CSVLink, CSVDownload } from "react-csv";
import Grid from '@material-ui/core/Grid';



const Carlist = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

   useEffect(() => {
    fetchCars();
   }, [])

   const handleClose = (event, reason) => {
     setOpen(false);
  };

   const fetchCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then((response) => response.json())
    .then((responseData) => {
        setCars(responseData._embedded.cars)
    
    })
   };

   const saveCar = (newCar) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
    method: 'POST', 
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(newCar)
   })
    .then(res => fetchCars())
    .catch(err => console.error(err))
}
   

   const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
    fetch(link, {method: 'DELETE'})
    .then (res => fetchCars())
    .then (res => setMessage('Car deleted'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   } }

   const updateCar = (link, car) => {
fetch(link, {
    method:'PUT',
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(car)
})
    .then(res => fetchCars())
    .then (res => setMessage('Changes saved succesfully'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   }

   const columns = [{
    Header: 'Brand',
    accessor: 'brand' ,
    
    }, {
    Header: 'Model',
    accessor: 'model',
   
    },
    {
    Header: 'Color',
    accessor: 'color',
   
    },{
    Header: 'Fuel',
    accessor: 'fuel',
    
    },{
    Header: 'Year',
    accessor: 'year',
    
    },{
    Header: 'Price',
    accessor: 'price',
  
    }, {    
    
    accessor: '_links.self.href',
    sortable: false,
    filterable: false,
    Cell: row =>  <EditCar car={row.original} updateCar = {updateCar}/>        
        },{    
    
    accessor: '_links.self.href',
    sortable: false,
    filterable: false,
    Cell: ({value}) =>         
    <Button color ="secondary" size="small" onClick = {() => deleteCar(value)}>Delete</Button>
    }]

    return (
        <div>
            <grid container>
        <AddCar saveCar = {saveCar}/>
       </grid>
        <grid item>
        <CSVLink data={cars} separator={";"}>Export data</CSVLink>
        </grid>
       
        <ReactTable filterable={true} data={cars} columns={columns}/>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
         </div>
    );
};

export default Carlist;