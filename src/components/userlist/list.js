import React, { useEffect, useState } from 'react'
import parseJwt from '../../helpers/authHelper'
import {Container} from 'reactstrap'
import { Table } from 'reactstrap';

const UserList = () => {
    const token = sessionStorage.getItem('token')
    const user = parseJwt(token).username
    const [listing, setListing] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4000/patients/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setListing(data)
        }
        getData()
    }, [token])
   
    return (
        <Container>{user}
        <center><h2 className="display-5">Total Patients:{listing.length}</h2></center><br/>
                    {listing.length === 0 &&
                        <tr><td colSpan="4" className="text-center"><i>No Users Found/Somthing Went Wrong/Make Sure API is Running</i></td></tr>
                    }  
                          
                    
                    {listing.length > 0 &&
                        listing.map(entry => 
                          
                          <Table>
                          <tbody>
                          <tr>
                          <td><b>First Name</b></td>
                          <td><b>Last Name</b></td>
                          <td><b>Date Of Birth</b></td>
                          <td><b>O.H.I.P Number</b></td>
                          <td><b>Address</b></td>
                          <td><b>Phone Number</b></td>
                          <td><b>Email Address</b></td>
                          <td><b>Age</b></td>
                          </tr>
                       </tbody>
                          <tbody>
                          <tr>
                          <td>{entry.name}</td>
                          <td>{entry.Last_Name}</td>
                          <td>{entry.DOB}</td>
                          <td>{entry.OHIP}</td>
                          <td>{entry.Address}</td>
                          <td>{entry.Phone_Number}</td>
                          <td>{entry.email}</td>
                          <td>{entry.Age}</td>
                          </tr>
                          </tbody>
                          </Table>)
                    }
        </Container>
    )
}

export default UserList

