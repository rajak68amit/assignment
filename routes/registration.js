const validation = require('../middleware/validation-middleware');
const registrationController = require('../controllers/registrationController');
const courseController = require('../controllers/courseController');
module.exports = function (app) {
   app.route('/signup').post(registrationController.signup); 
    app.route('/course').get(courseController.course);
    app.route('/group').get(courseController.group);
    app.route('/group/:id/courses').get(courseController.groupcours);
 }

