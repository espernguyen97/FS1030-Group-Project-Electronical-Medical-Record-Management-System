import React from 'react'
import './App.css'
import Navigation from './components/shared/Navigation'
import Footer from './components/shared/footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/pages/Login'
import Listing from './components/pages/Listing'
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
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />  
    </BrowserRouter>
  )
}

export default App;
