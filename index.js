const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors')

const app = express();
const db = require('./config/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const port = process.env.PORT || 4000;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`Server Start On Port :- ${port}`);
});