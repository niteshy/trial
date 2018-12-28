module.exports = app => {
	const surgeon = require('../controllers/surgeonController.js');

/*********************************************************************************************************
Task 1 : Add new surgeon record to mongodb database (Individual or Bulk Upload)
Task 2 : Retrieve list of all specialties for user interface
Task 3 : Find surgeons by location and specialty
*********************************************************************************************************/

	// Add One Surgeon Record
	app.post('/surgeon', surgeon.create);

  // Add JSON Payload
  app.post('/surgeon/upload', surgeon.upload);

  // Retrive all surgeons specualities
  app.get('/specialties', surgeon.getAllSpecialties);

  // Retrive surgeon by location and speciality
  app.get('/surgeons', surgeon.findSurgeons);

};
