/* COMPONENT: For displaying menu bar listing all specialty */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

class Menu extends React.Component {
  render(props) {
    console.log("Value of title inside menu component:",this.props);
    return (
      <div>
        <div className="row2">
          <div className="navbar">
            <a href="#">{this.props.specialtyList[5]}</a>
            <a href="#">{this.props.specialtyList[0]}</a>
            <a href="#">{this.props.specialtyList[6]}</a>
            <a href="#">{this.props.specialtyList[2]}</a>
            <a href="#">{this.props.specialtyList[3]}</a>
            <a href="#">{this.props.specialtyList[1]}</a>
            <a href="#">{this.props.specialtyList[4]}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
