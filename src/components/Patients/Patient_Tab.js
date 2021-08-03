import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Notes from "./Patient_Notes";
import PatientCreateNoteModal from './Create_Note_Modal';
import NotesIcon from '@material-ui/icons/Notes';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HistoryIcon from '@material-ui/icons/History';
import MedicalHistory from './Patient_Medical_History_List';
import CreateNewMedicalHistoryModal from './Create_New_Medical_History_Modal';
import PatientRevisionHistory from './Patient_Revision_History';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
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
}));

export default function PatientTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Notes" icon={<NotesIcon />} {...a11yProps(0)} />
          <Tab label="Medical History" icon={<LocalHospitalIcon />} {...a11yProps(1)} />
          <Tab label="Revision History" icon={<HistoryIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PatientCreateNoteModal/><br/>
        <Notes/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateNewMedicalHistoryModal/><br/>
        <MedicalHistory/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PatientRevisionHistory/>
      </TabPanel>
    </div>
  );
}