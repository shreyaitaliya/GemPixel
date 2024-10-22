const express = require('express');

const routes = express.Router();

// URL Controller
const urlController = require('../controllers/urlController');

routes.post('/', urlController.AddShortURL);

routes.get('/:id', urlController.GetURL);


module.exports = routes