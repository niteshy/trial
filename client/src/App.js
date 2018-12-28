import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/banner/banner';
import Specialty from './components/specialty/specialty';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Specialty />
      </div>
    );
  }
}

export default App;
