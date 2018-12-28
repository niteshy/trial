/* COMPONENT: For displaying banner image */

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/banner.png';
import '../../App.css';

class Banner extends Component {
  render() {
    return (
      <div>
        <div className="row2">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Banner;
