import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row,Col } from 'reactstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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
              <Typography variant="body2" color="textSecondary" component="p">
              I'm a tech passionate person, always willing to learn new things.I am an individual who seeks to find the most efficient way of completing my tasks & will go up and beyond what is expected to achieve the results.I have experience with Game developement/Modding and many things web oriented like website & application creation from small websites to .<br/><br/><br/>
              </Typography>
            </CardContent>
        </Card>
      </Col>
        <Col>
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
                <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac purus facilisis, feugiat enim eu, fermentum libero. Aliquam pellentesque nisl sed tempus dapibus. Sed sed purus enim. Duis ut magna id ex euismod ornare quis eget nisl. Quisque varius rutrum feugiat. Morbi laoreet viverra felis ac malesuada. Aenean sed felis non risus semper ultricies. Aenean aliquam finibus velit vitae hendrerit.
                </Typography>
              </CardContent>
          </Card>
      </Col>
        <Col>
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
                <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac purus facilisis, feugiat enim eu, fermentum libero. Aliquam pellentesque nisl sed tempus dapibus. Sed sed purus enim. Duis ut magna id ex euismod ornare quis eget nisl. Quisque varius rutrum feugiat. Morbi laoreet viverra felis ac malesuada. Aenean sed felis non risus semper ultricies. Aenean aliquam finibus velit vitae hendrerit.
                </Typography>
              </CardContent>
          </Card>
      </Col>
    </Row>
    <br/>
    <Row>
      <Col>
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
              <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac purus facilisis, feugiat enim eu, fermentum libero. Aliquam pellentesque nisl sed tempus dapibus. Sed sed purus enim. Duis ut magna id ex euismod ornare quis eget nisl. Quisque varius rutrum feugiat. Morbi laoreet viverra felis ac malesuada. Aenean sed felis non risus semper ultricies. Aenean aliquam finibus velit vitae hendrerit.
              </Typography>
            </CardContent>
        </Card>
      </Col>
          <Col>
          </Col>
        <Col>
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
                <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac purus facilisis, feugiat enim eu, fermentum libero. Aliquam pellentesque nisl sed tempus dapibus. Sed sed purus enim. Duis ut magna id ex euismod ornare quis eget nisl. Quisque varius rutrum feugiat. Morbi laoreet viverra felis ac malesuada. Aenean sed felis non risus semper ultricies. Aenean aliquam finibus velit vitae hendrerit.
                </Typography>
              </CardContent>
          </Card>
      </Col>
    </Row>
  </main>
  </Container>
  );
}