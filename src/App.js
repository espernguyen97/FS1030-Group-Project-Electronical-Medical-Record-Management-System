import React, { useState } from 'react'
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
import PrivateRoute from './components/shared/PrivateRoute'
import NotFound from './components/404';
import SideNav from './components/shared/SideNav'
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  const [token, setToken] = useState(false)
  const [user, setUser] = useState(false)

  return (
   <BrowserRouter>
        <CssBaseline />
        <Navigation token={token} setToken={setToken} user={user} setUser={setUser}/>
        <Switch>
          <Route exact path="/login">
            <Login token={token} setToken={setToken} setUser={setUser}/>
          </Route>
          <PrivateRoute>
            <SideNav />
            <PrivateRoute component={Listing} exact path="/submissions" />
            <PrivateRoute component={Caregivers} exact path="/caregivers" />
            <PrivateRoute component={SubmitTicket} exact path="/submit_ticket" />
            <PrivateRoute component={TicketList} exact path="/tickets" />
            <PrivateRoute component={EditPatient} exact path="/patients/:id" />
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
