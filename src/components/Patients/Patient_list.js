import React, { useEffect, useState } from 'react'
import parseJwt from '../../helpers/authHelper'
import {Container} from 'reactstrap'
import { Table,Button,Row } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const PatientList = () => {
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
    <Container className="mainContent">
        <Row className="userTitle">
        <h2 className="display-5">Total Patients:{listing.length}{user}</h2>
        </Row>
        <Table responsive className="content">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date Of Birth</th>
                <th>O.H.I.P Number</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Age</th>
                <th>Edit</th>
                
                </tr>
            </thead>
            <tbody>
                {listing.length === 0 &&
                    <tr><td colSpan="4" className="text-center"><i>No Patients found</i></td></tr>
                }
                {listing.length > 0 &&
                    listing.map(entry => <tr><td>{entry.First_Name}</td><td>{entry.Last_Name}</td><td>{entry.DOB}</td><td>{entry.OHIP}</td><td>{entry.Phone_Number}</td><td>{entry.Email}</td><td>{entry.Age}</td><td> <Button color="primary" type="submit"><EditIcon/></Button> <Button color="danger" type="submit"><DeleteForeverIcon/></Button></td></tr>)
                }
            </tbody>

           


        </Table>
    </Container>
)
}

export default PatientList
