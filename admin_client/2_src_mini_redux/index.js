import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store.js'

ReactDOM.render(<App />,document.getElementById('root'));
store.subscribe(()=>{
  ReactDOM.render(<App />,document.getElementById('root'));
})
