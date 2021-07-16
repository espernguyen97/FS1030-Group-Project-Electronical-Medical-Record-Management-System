import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EnhancedTable from './userlist/list';
import CU from './pages/CU';
import PwGen from './pwgen/pwgen';
import { Row,Col} from 'reactstrap';
import PersonIcon from '@material-ui/icons/Person';
import BugReportIcon from '@material-ui/icons/BugReport';
import HelpIcon from '@material-ui/icons/Help';
import TicketSubmissionsList from './Ticket_System/Ticket_Listing';
import TicketInput from './Ticket_System/Ticket_Input';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
      classname="adminpanel"
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

}));

export default function AdminPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <br/>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Create New Doctor" icon={<SupervisorAccountIcon />} {...a11yProps(0)} />
          <Tab label="Patient Records" icon={ <PersonIcon/> } {...a11yProps(1)} />
          <Tab label="Submit Ticket" icon={ <HelpIcon/> } {...a11yProps(2)} />
          <Tab label="View Tickets" icon={ <BugReportIcon/> } {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <hr class="yellow"/>
            <Row className="my-5">
                  <Col>
                      <CU/> {/* Create User Section*/}
                  </Col>
                  <Col>
                      <PwGen/> {/* Password Gen*/}
                  </Col>
            </Row>
        <hr class="yellow"/>
            
      </TabPanel>
      <TabPanel value={value} index={1}>
          <br/>
            <hr class="yellow"/>
            <Row>
                  <Col>
                    <div className={classes.root}>
                      <EnhancedTable/>   {/* User Table*/} 
                    </div>
                        <hr class="yellow"/>
                  </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
          <br/>
            <hr class="yellow"/>
            <Row>
                  <Col>
                    <div className={classes.root}>
                      <TicketInput/>   {/* Submit Ticket*/} 
                    </div>
                        <hr class="yellow"/>
                  </Col>
            </Row>
      </TabPanel>
      <TabPanel value={value} index={3}>
          <br/>
            <hr class="yellow"/>
            <Row>
                  <Col>
                    <div className={classes.root}>
                      <TicketSubmissionsList/>   {/* View Ticket*/} 
                    </div>
                        <hr class="yellow"/>
                  </Col>
            </Row>
      </TabPanel>
    </div>
  );
}