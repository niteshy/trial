/* COMPONENT: Get location and specialty from form fields.
Retrive surgeons by location and specialty */

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

//Defining URL for API request
var findSurgeonsURL = `http://localhost:3000/surgeons?`;

class Form extends Component {
  constructor() {
    super();
    this.state = {
      surgeonsList: [],
      errors: [],
      showErrorMessages:false,
      location: "",
      specialty: ""
    }

    this.handleChangeSpecialty = this.handleChangeSpecialty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLocation(event){
        console.log("Location typed",event.target.value)
        this.setState({location:""})
        this.setState({location: event.target.value});
        this.setState({errors: []})
        if(this.state.location.length<=0){
          console.log("empty field")
          this.state.errors.push("Please enter location");
          this.setState({messageType:"alert alert-danger"})
          return
        }
  }

  handleChangeSpecialty(event){
        this.setState({specialty:""})
        this.setState({specialty: event.target.value});
        this.setState({errors: []})
        if(this.state.specialty.length<=0){
          console.log("empty field")
          this.state.errors.push("Please enter Specialty");
          this.setState({messageType:"alert alert-danger"})
          return
        }
  }

  handleSubmit (event) {
    console.log("Location that is sent to url",this.state.location)
    var findSurgeonsURL = `http://localhost:3000/surgeons?`;
    findSurgeonsURL = `${findSurgeonsURL}location=${this.state.location}&specialty=${this.state.specialty}`;
    
    // API call to find surgeons by location and specialty
      fetch(`${findSurgeonsURL}`, {
          method: 'GET',
          mode: 'cors',
      }).then(res => res.json())
      .then(res => {
        console.log("Surgeons list is as follows",res)
          if(res){
              console.log("Found surgeons Successfully!!")
              this.setState({errors: []})
              this.setState({surgeonsList: res,messageType:"alert alert-light"})
            }
          else{
              console.log("search error!!")
            }
          }).catch(err => {
              console.log("Server error while searching surgeon");
              return err;
          });
      event.preventDefault();
  }

  render(props) {
    return (
      <div>
          <div className="row1">
                <div className="col-sm-4">
                    <b>Find a da Vinci Surgeon</b><br/>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="inputLocation">Location</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control form-control-sm"
                          placeholder="Enter Location"
                          aria-label="Location"
                          aria-describedby="basic-addon1"
                          value={this.state.location}
                          onChange={this.handleChangeLocation.bind(this)}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="selectSpecialty">Surgical Specialty</label>
                        <select className="form-control form-control-sm" name="specialty" value={this.state.specialty} onChange={this.handleChangeSpecialty}>
                          <option value={this.props.specialtyList[0]}>{this.props.specialtyList[0]}</option>
                          <option value={this.props.specialtyList[1]}>{this.props.specialtyList[1]}</option>
                          <option value={this.props.specialtyList[2]}>{this.props.specialtyList[2]}</option>
                          <option value={this.props.specialtyList[3]}>{this.props.specialtyList[3]}</option>
                          <option value={this.props.specialtyList[4]}>{this.props.specialtyList[4]}</option>
                          <option value={this.props.specialtyList[5]}>{this.props.specialtyList[5]}</option>
                          <option value={this.props.specialtyList[6]}>{this.props.specialtyList[6]}</option>
                        </select>
                      </div>
                      <button type="submit" className="searchButton pull-right" value="submit">Search</button>
                    </form>
                </div>
                <div className="col-sm-8">
                    <b>Search Results</b><br/>
                    <div className="result">
                      <table className="table table-sm table-condensed">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Speciality</th>
                            <th scope="col">Contact Surgeon</th>
                          </tr>
                        </thead>
                        <tfoot className="thead-light">
                        <tr></tr>
                        </tfoot>
                        <tbody>
                          {this.state.surgeonsList.map((surgeonsList, i)=>{
                            return(
                              <tr key={i}>
                                <td>{surgeonsList.name.split(' ').slice(0, -1).join(' ')}</td>
                                <td>{surgeonsList.name.split(' ').slice(-1).join(' ')}</td>
                                <td>{surgeonsList.city}</td>
                                <td>{surgeonsList.state}</td>
                                <td>{surgeonsList.specialty}</td>
                                <td><a href={`mailto:${surgeonsList.email}`}>Contact Surgeon</a></td>
                              </tr>                              
                            )})}
                        </tbody>
                      </table>
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

export default Form;
