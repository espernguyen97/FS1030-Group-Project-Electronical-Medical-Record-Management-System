import React, { useEffect, useState } from 'react'
import parseJwt from '../../helpers/authHelper'
import {Container} from 'reactstrap'
import { Table,Col,Row } from 'reactstrap';

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
                          <Row>
                          <Col><b>First Name</b></Col>
                          <Col><b>Last Name</b></Col>
                          <Col><b>Date Of Birth</b></Col>
                          <Col><b>O.H.I.P Number</b></Col>
                          <Col><b>Phone Number</b></Col>
                          <Col><b>Email Address</b></Col>
                          <Col><b>Age</b></Col>
                          </Row>
                          <Row>
                          <Col>{entry.name}</Col>
                          <Col>{entry.Last_Name}</Col>
                          <Col>{entry.DOB}</Col>
                          <Col>{entry.OHIP}</Col>
                          <Col>{entry.Phone_Number}</Col>
                          <Col>{entry.email}</Col>
                          <Col>{entry.Age}</Col>
                          </Row>
                          </tbody>
                          </Table>)
                    }
        </Container>
    )
}

export default UserList

