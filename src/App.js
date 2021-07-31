import React, { useState, useEffect } from 'react'
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
import EditPatient from './components/pages/EditPatient'
import ViewPatient from './components/pages/ViewPatient'
import EditUser from './components/pages/EditUser'
import EditTicket from './components/Ticket_System/Ticket_Profile'
import PrivateRoute from './components/shared/PrivateRoute'
import NotFound from './components/404';
import SideNav from './components/shared/SideNav'
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  const [token, setToken] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
    setUser(JSON.parse(sessionStorage.getItem('currentUser')))
  }, []) //I added this effect to prevent any window refresh from resetting the states above back to their default false values. SW

  return (
   <BrowserRouter>
        <CssBaseline />
        <Navigation token={token} setToken={setToken} user={user} setUser={setUser}/>
        <Switch>
          <Route exact path="/login">
            <Login setToken={setToken} setUser={setUser}/>
          </Route>
          <PrivateRoute>
            <SideNav />
            <PrivateRoute component={Listing} exact path="/submissions" />
            <PrivateRoute component={Caregivers} exact path="/caregivers" />
            <PrivateRoute component={SubmitTicket} exact path="/submit_ticket" />
            <PrivateRoute component={TicketList} exact path="/tickets" />
            <PrivateRoute component={EditPatient} exact path="/edit-patient/:id" />
            <PrivateRoute component={ViewPatient} exact path="/patient/:id" />
            <PrivateRoute component={EditUser} exact path="/users/:id" />
            <PrivateRoute component={EditTicket} exact path="/tickets/entries/:id" />
            <PrivateRoute component={Patients} exact path="/patients" />
            <PrivateRoute component={Caregivers} exact path="/logout" />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />  
    </BrowserRouter>
  )
}

export default App;
