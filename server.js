var express = require('express'),
    fwrules=require('./routes/fwrules');
var app = express();

var logger = require('morgan');

var bodyParser=require ('body-Parser');

app.use(logger('dev'));  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false })); 
 


 //   app.use(logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */

   // app.use(express.bodyParser());

app.get('/GetRules', fwrules.getRules) 
app.get('/SearchRules/:criteria', fwrules.searchRules) 

app.post('/Rules', fwrules.addRule);

app.put('/Rules/:id', fwrules.updateRule);

app.delete('/Rules/:id', fwrules.deleteRule);

app.get('/FindById/:id', fwrules.findById);
app.listen(3000);

console.log('Listening on port 3000...');