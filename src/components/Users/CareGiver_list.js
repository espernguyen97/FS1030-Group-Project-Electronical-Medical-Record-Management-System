import React, { useEffect, useState } from 'react'
import parseJwt from '../../helpers/authHelper'
import {Container} from 'reactstrap'
import { Table,Button,Row } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const CareGiverList = () => {
    const token = sessionStorage.getItem('token')
    const user = parseJwt(token).username
    const [listing, setListing] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4000/users/', {
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
        <h2 className="display-5">Total Users:{listing.length}{user}</h2>
        </Row>
        <Table responsive className="content">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Job Position</th>
                <th>Admin Flag</th>
                
                </tr>
            </thead>
            <tbody>
                {listing.length === 0 &&
                    <tr><td colSpan="4" className="text-center"><i>No Users found</i></td></tr>
                }
                {listing.length > 0 &&
                    listing.map(entry => <tr><td>{entry.First_Name}</td><td>{entry.Last_Name}</td><td>{entry.Email}</td><td>{entry.Username}</td><td>{entry.Email}</td><td>{entry.Job_Position}</td><td>{entry.Admin_Flag}</td><td> <Button color="primary" type="submit"><EditIcon/></Button> <Button color="danger" type="submit"><DeleteForeverIcon/></Button></td></tr>)
                }
            </tbody>

           


        </Table>
    </Container>
)
}

export default CareGiverList

