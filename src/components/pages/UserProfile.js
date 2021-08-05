import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Button } from "reactstrap";
import { Card, CardContent } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

//profile Picture
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

const UserProfile = (props) => {
    const token = sessionStorage.getItem("token");
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const id = props.match.params.id
            const response = await fetch(`http://localhost:4000/user/${id}`, {
              method: 'GET',
              mode: 'cors',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
            })
            const currentUser = await response.json()
            delete currentUser.Password
            setUser(currentUser)
        }
        getUser()
    }, [])

    const history = useHistory();

    const userEditRoute = (event, user) => {
        event.preventDefault();
        let path = `/edit-user/${user.UserID}`
        history.push(path, user);
    }
    //profile Picture
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState(null);

    const getPerson = async () => {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        const person = data.results[0];
        const { large: image } = person.picture;

        const newPerson = {
        image,
        };
        setPerson(newPerson);
        setLoading(false);
    };

    useEffect(() => {
        getPerson();
    }, []);

    return (
        <div className="main-panel">
            <Card>               
                <CardContent>
                    <br/>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h2>{user.First_Name} {user.Last_Name}</h2>
                        <Button color="primary" title="Edit Profile Details" onClick={(e) => userEditRoute(e, user)}>
                            <EditIcon />
                        </Button>
                    </div>
                    <br/>
                    <Container>
                        <Row>
                            <br/>
                            <img
                                src={(person && person.image) || defaultImage}
                                alt="random user"
                                className="user-img"
                            />
                            <Col style={{marginLeft: "5rem"}}>
                                <p><span style={{color: "grey"}}>ID:</span> {props.match.params.id}</p>
                                <p><span style={{color: "grey"}}>Username:</span> {user.Username}</p>
                                <p><span style={{color: "grey"}}>Last login:</span> {moment(user.Last_Login).format("YYYY-MM-DD")}</p>
                            </Col>
                            <Col>
                                <p><span style={{color: "grey"}}>Job position:</span> {user.Job_Position}</p>
                                <p><span style={{color: "grey"}}>Email:</span> {user.Email}</p>
                            </Col>
                        </Row>
                    </Container>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserProfile