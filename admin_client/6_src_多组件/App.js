import React, { Component } from 'react'
import Count from './containers/count.jsx'
import Person from './containers/person.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
        <Count/>
        <hr/>
        <Person/>
      </div>
    )
  }
}


