import React, { useEffect, useState } from 'react'
import { Container,Col} from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Bounce from 'react-reveal/Bounce';

const useStyles = makeStyles({
    root: {
      maxWidth: 845,
    },
    media: {
      height: 240,
    },
  });


const TicketSubmissionsList = () => {
    const token = sessionStorage.getItem('token')
    const [listing, setListing] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4000/tickets/entries', {
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
        <Container>
            <main>
            <center>
                <h1 className="display-3">Admin Ticket System</h1><br/></center>
                    {listing.length === 0 &&
                        <i>No Tickets found/Please make sure RestAPI is running</i>
                    }
                    {listing.length > 0 &&
                        listing.map(entry => 
                          <section>
                            <center>
                            <Bounce left>
                              <Col>
                              <Card className={classes.root}>
                              <CardActionArea>
                                <CardMedia
                                  className={classes.media}
                                  image="https://i.ibb.co/9hb9Skn/newmail.png"
                                  title= {entry.Title}
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                  {entry.Title}<br/>
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary" component="p">
                                  {entry.Ddate}<br/><br/>
                                  {entry.email}<br/><br/>
                                  {entry.content}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                              </CardActions>
                              </Card>
                              </Col>
                              </Bounce>
                            </center>
                            <br/>
                            <br/>
                          </section>)
                    }
               
            </main>
        </Container>
        
    )
}

export default TicketSubmissionsList



