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


function App() {
  return (
   <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/submissions">
            <Listing />
          </PrivateRoute>
          <PrivateRoute path="/CareGivers">
            <Caregivers />
          </PrivateRoute>
          <PrivateRoute path="/Submit_Ticket">
            <SubmitTicket />
          </PrivateRoute>
          <PrivateRoute path="/Tickets">
            <TicketList />
          </PrivateRoute>
          <PrivateRoute path="/Patients">
            <Patients />
          </PrivateRoute>
          <PrivateRoute path="/logout">
            <Listing />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />  
    </BrowserRouter>
  )
}

export default App;
