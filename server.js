require('./models/db');

const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')

const employeeController = require('./controllers/employeeController')

const app = express();


//MIDDLEWARE
//Moteur Template 
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ 
    extname: 'hbs', 
    defaultLayout: 'mainLayout', 
    runtimeOptions: {
              allowProtoPropertiesByDefault: true,
              allowProtoMethodsByDefault: true,
            },
    layoutsDir: __dirname + '/views/layouts/',
    
}));




app.listen(3000, () => {
    console.log('running on port 3000');
})

app.use('/employee', employeeController);