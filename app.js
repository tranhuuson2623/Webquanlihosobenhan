const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();
const port = 5000;

global.db = require('./routes/database');

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(cookieParser());

const {getHomePage} = require('./routes/index');
const user = require('./routes/user');
const benhnhan = require('./routes/benhnhan');
const validate = require('./validate/user.validate');


// routes for the app
app.get('/login', user.getLogin);
app.post('/login', user.postLogin)

app.use(validate.postLogin);

app.get('/', getHomePage);
app.get('/add', benhnhan.getAddBenhnhan);
app.get('/edit/:id', benhnhan.getEditBenhnhan);
app.get('/delete/:id', benhnhan.getDeleteBenhnhan);
app.get('/logout', user.getLogout);

app.post('/add', benhnhan.postAddBenhnhan);
app.post('/edit/:id', benhnhan.postEditBenhnhan);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});