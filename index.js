const express = require('express');
const app = express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose')
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded())
app.use(cookieParser());
//setting individual styles along with layout style
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);


app.use(express.static('./assets'));
//use express router 
app.use('/',require('./routes'))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
})
