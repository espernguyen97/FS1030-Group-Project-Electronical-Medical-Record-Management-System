import React from 'react'
import './App.css'
import Navigation from './components/shared/Navigation'
import Footer from './components/shared/footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/pages/Login'
import Listing from './components/pages/Listing'
import Caregivers from './components/pages/CareGivers'
import SubmitTicket from './components/pages/SubmitTicket'
import TicketList from './components/pages/Tickets'
import Patients from './components/pages/Patients'
import PrivateRoute from './components/shared/PrivateRoute'
import NotFound from './components/404';
import SideNav from './components/shared/SideNav'
import CssBaseline from '@material-ui/core/CssBaseline';



function App() {
  return (
   <BrowserRouter>
        <CssBaseline />
        <Navigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute>
            <SideNav />
            <PrivateRoute component={Listing} path="/submissions" />
            <PrivateRoute component={Caregivers} path="/CareGivers" />
            <PrivateRoute component={SubmitTicket} path="/Submit_Ticket" />
            <PrivateRoute component={TicketList} path="/Tickets" />
            <PrivateRoute component={Patients} path="/Patients" />
            <PrivateRoute component={Caregivers} path="/logout" />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />  
    </BrowserRouter>
  )
}

export default App;
