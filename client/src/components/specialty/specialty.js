/* COMPONENT: Retrive list of all specialty by doing an API call.
Parent component for 'Form' and 'Menu' component passing specialty list as props  */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Menu from '../../components/menu/menu';
import Form from '../../components/searchForm/form';

var getAllSpecialties = `http://localhost:3000/specialties`;

class Specialty extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        specialtyList: []
      }
  }
  componentDidMount() {
    // API call to find list of all specialty
      fetch(`${getAllSpecialties}`, {
         method: 'GET',
         mode: 'cors',
      }).then(res => res.json())
      .then(res => {
          console.log("Specialities list is as follows",res)
           if(res){
               console.log(`Found ${res.length} Specialities!`)
               this.setState({specialtyList: res})
             } else{
               console.log("search error!!")
            }
         }).catch(err => {
             console.log("Server error while searching specialities");
             return err;
         });
  }
  render() {
    return (
      <div>
          <Menu specialtyList={this.state.specialtyList}/>
          <Form specialtyList={this.state.specialtyList}/>
      </div>
    );
  }
}
export default Specialty;
