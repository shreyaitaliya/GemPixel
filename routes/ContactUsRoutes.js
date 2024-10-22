const express = require('express');

const routes = express.Router();

// Register Controller
const registerCOntroller = require('../controllers/ContactUsController');

routes.post('/', registerCOntroller.AddUser);

// routes.post('/login', registerCOntroller.LoginUser);

module.exports = routes