import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import moment from 'moment';




const CustomerList = () => {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    var editlink = 'https://customerrest.herokuapp.com/api/trainings/'

   useEffect(() => {
    fetchTraining();
   }, [])

   const handleClose = (event, reason) => {
     setOpen(false);
  };



   
   const fetchTraining = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
        setTraining(responseData)    
    })
   };

   const saveTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST', 
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(newTraining)
   })
    .then(res => fetchTraining())
    .catch(err => console.error(err))
}
   

   const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
        console.log(editlink + link)
    fetch(editlink + link, {method: 'DELETE'})
    .then (res => fetchTraining())
    .then (res => setMessage('Training deleted'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   } }

   const updateTraining = (link, training) => {
    fetch(link, {
    method:'PUT',
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(training)
    })
    .then(res => fetchTraining())
    .then (res => setMessage('Changes saved succesfully'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   }



    const Trainingcolumns = [{
        id: 'date',
        Header: 'date',
        accessor: d => {
            return moment(d.date)
              .local()
              .format("hh:mm DD.MM.YYYY")
          },
        
        }, {
        Header: 'duration',
        accessor: 'duration',
       
        },
        {
        Header: 'activity',
        accessor: 'activity',
          
        }, {   
    
        accessor: editlink + 'id',
        sortable: false,
        filterable: false,
        Cell: row =>  <EditTraining training={row.original} updateTraining = {updateTraining}/>        
            },{    
             
        accessor: 'id',
        sortable: false,
        filterable: false,
        Cell: ({value}) =>      
        <Button color ="secondary" size="small" onClick = {() => deleteTraining(value)}>Delete</Button>
        
        }]

    return (
        <div>
            <grid container>
        <AddTraining saveTraining = {saveTraining} fetchTraining = {fetchTraining}/>
        
       </grid>
       
        <ReactTable filterable={true} data={training} columns={Trainingcolumns}/>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
         </div>
    );
};

export default CustomerList;