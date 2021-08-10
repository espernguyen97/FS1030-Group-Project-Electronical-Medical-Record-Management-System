import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row,Col } from 'reactstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
});

export default function Teams() {
  const classes = useStyles();

  return (
  <Container>
    <main>
      <center><h1>Group D Team Roster</h1></center><br/>
    <Row>
      <Col>
      <Slide left>
        <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="David D-Hart"
              height="140"
              image="https://ca.slack-edge.com/T013QGKDVGA-U01JJ0AHGTU-475c3167e358-512"
              title="David D-Hart"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
              <h3>David D-Hart</h3>
              </Typography>
            </CardContent>
        </Card>
      </Slide>
      </Col>
        <Col>
      <Zoom>
          <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="Steven David White"
                height="140"
                image="https://ca.slack-edge.com/T013QGKDVGA-U01JJ6C6K8B-58ce5e0114fd-512"
                title="Steven David White"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                <h3>Steven D White</h3>
                </Typography>
              </CardContent>
          </Card>
      </Zoom>
      </Col>
        <Col>
      <Slide right>
          <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="Chris Germishuys"
                height="140"
                image="https://ca.slack-edge.com/T013QGKDVGA-U01JJ0B3E8J-e9a462fe9856-512"
                title="Chris Germishuys"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                <h3>Chris Germishuys</h3>
                </Typography>
              </CardContent>
          </Card>
      </Slide>
      </Col>
    </Row>
    <br/>
    <Row>
      <Col>
      <Slide left>
        <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="Nhi Nguyen"
              height="140"
              image="https://ca.slack-edge.com/T013QGKDVGA-U01K7R2B5LG-bbe48bf894ec-512"
              title="Nhi Nguyen"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
              <h3>Nhi Nguyen</h3>
              </Typography>
            </CardContent>
        </Card>
      </Slide>
      </Col>
          <Col>
          </Col>
        <Col>
      <Slide right>
          <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="Mathivannan Mahalingam"
                height="140"
                image="http://simpleicon.com/wp-content/uploads/user1.png"
                title="Mathivannan Mahalingam"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                <h3>Mathivannan M</h3>
                </Typography>
              </CardContent>
          </Card>
      </Slide>
      </Col>
    </Row>
  </main>
  </Container>
  );
}