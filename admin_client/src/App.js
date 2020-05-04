import React, { Component } from 'react'
import {Switch, Route , Redirect} from 'react-router-dom'
import Login from './containers/login/login.jsx'
import Admin from './containers/admin/admin.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>
          <Redirect to='/login'/>
        </Switch>
      </div>
    )
  }
}

