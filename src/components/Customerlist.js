import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import Editcustomer from './Editcustomer';
import Appointments from './Appointments';
import Training from './Training';




const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

   useEffect(() => {
    fetchCustomers();
   }, [])

   const handleClose = (event, reason) => {
     setOpen(false);
  };

   const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
        setCustomers(responseData.content)
    
    })
   };

   const saveCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST', 
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(newCustomer)
   })
    .then(res => fetchCustomers())
    .catch(err => console.error(err))
}
   

   const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
        console.log(link)
    fetch(link, {method: 'DELETE'})
    .then (res => fetchCustomers())
    .then (res => setMessage('Customer deleted'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   } }

   const updateCustomer = (link, customer) => {
fetch(link, {
    method:'PUT',
    headers: {'Content-type': 'application/json'}, 
    body: JSON.stringify(customer)
})
    .then(res => fetchCustomers())
    .then (res => setMessage('Changes saved succesfully'))
    .then (res => setOpen(true))
    .catch(err => console.error(err))
   }



   const Customercolumns = [{
    Header: 'firstname',
    accessor: 'firstname' ,
    
    }, {
    Header: 'lastname',
    accessor: 'lastname',
   
    },
    {
    Header: 'streetaddress',
    accessor: 'streetaddress',
   
    },{
    Header: 'postcode',
    accessor: 'postcode',
    
    },{
    Header: 'city',
    accessor: 'city',
    
    },{
    Header: 'email',
    accessor: 'email',
  
    }, {    
    Header: 'phone',
    accessor: 'phone',
      
    }, {   

    accessor: 'links[0].href',
    sortable: false,
    filterable: false,
    Cell: row =>  <Editcustomer customer={row.original} updateCustomer = {updateCustomer}/>        
        },{    
    
    accessor: 'links[0].href',
    sortable: false,
    filterable: false,
    Cell: ({value}) =>    
    <Button color ="secondary" size="small" onClick = {() => deleteCustomer(value)}>Delete</Button>
    
    }]

    return (
        <div>
            <grid container>
        <AddCustomer saveCustomer = {saveCustomer}/>   
       </grid>
        <ReactTable filterable={true} data={customers} columns={Customercolumns}/>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>

         </div>
    );
};

export default CustomerList;