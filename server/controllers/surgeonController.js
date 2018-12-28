
//IMPORTS: Bind model to Surgeon
const Surgeon = require('../models/surgeonmodel.js');
const fs = require("fs");
const async = require("async");
const _ = require("lodash");

//METHOD: Saving an individual surgeon information in database.
function addNewSurgeonRecord(obj, callback){
    const surgeon = new Surgeon({
      name: obj.name || '',
      city: obj.city,
      state: obj.state,
      specialty: obj.specialty,
      email: obj.email
    });
    Surgeon.find(function (err, surgeons){
      if(err){
        callback(err);
      } else {
          if(_.isEmpty(surgeons)){
            console.log("No match found");
            surgeon.save(function (err) {
                if (err){
                  console.log("The error while saving is", err);
                  callback(err);
                } else {
                  console.log("Object is saved");
                  callback();
                }
            });
          } else {
                  console.log("Already present");
                  callback();
          }
      }
    });
}

// API 1: Create and Save a new surgeon information
exports.create = (request, response) => {
    if(!request.body) {
        return response.status(400).send({
            message: "Hmmm, trying to save an empty surgeon."
        });
    }
    // Create a new surgeon
    const surgeon = new Surgeon({
      name: request.body.name || 'Mystery Surgeon',
      city: request.body.city,
      state: request.body.state,
      specialty: request.body.specialty,
      email: request.body.email
    });
    // Save to database
    surgeon.save().then(data => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message: err.message || 'An error occurred while creating the surgeon.'
        });
    });
};

// API 2: Bulk upload all Surgeon from the payload
exports.upload = (request, response) => {
  var contents = fs.readFileSync("./data/assignment.json");
  var jsonContent = JSON.parse(contents);
  async.each(jsonContent, addNewSurgeonRecord, function(err){
      if( err ) {
        console.log("Error happen on upload API");
        response.status(500).send({
          message: err.message || 'An error occurred while creating the surgeon.'
        });
      } else {
        response.status(200).send(jsonContent);
      }
    });
};


// API 3: Getting list of all unique Specialties from database
exports.getAllSpecialties = (request, response) => {
    Surgeon.distinct("specialty")
        .then(specialties => {
            console.log("All specialties",specialties);
            response.send(specialties);
        }).catch(err => {
            response.status(500).send({
                message: err.message || 'An error occurred while trying to get all the specialties.'
            });
    });
};

// API 4: Retrive Surgeons by location(city or state) and speciality
exports.findSurgeons = (request, response) => {
    console.log("Printing request query",request.query);
    Surgeon.find({"specialty":request.query.specialty, $or:[{"state": request.query.location},{"city": request.query.location}]})
        .then(surgeons => {
            console.log("Matched surgeons are", surgeons);
            response.send(surgeons);
        }).catch(err => {
            response.status(500).send({
                message: err.message || 'An error occurred while trying to get all the surgeon.'
            });
    });
};
