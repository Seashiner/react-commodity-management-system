import React, { Component } from 'react'
import { Button ,DatePicker } from 'antd';

export default class App extends Component {
  render() {
    return (
      <div>
        Hello。
        <Button type="primary">按钮</Button>
        <DatePicker/>
      </div>
    )
  }
}

