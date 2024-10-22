const express = require('express');

const routes = express.Router();

// Register Routes 
routes.use('/contactus', require('../routes/ContactUsRoutes'));

routes.use('/url', require('../routes/urlRoutes'));

module.exports = routes;