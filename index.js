const express = require('express');
const app = express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');

const session = require('express-session');
const passport = require('passport'); 
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(expressLayouts);
app.use(express.urlencoded())
app.use(cookieParser());
//setting individual styles along with layout style
app.set('layout extractStyles' ,true);
app.set('layout extractScripts' ,true);


//use express router 

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    indentedSyntax:false,
    outputStyle:'expanded',
    prefix:'/css'
}));

app.use(express.static('./assets'));

//mongo store is used to store session cookie in db
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100 ) 
    },
    store:new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || "connect-mogo db setup ok")
    })
}));

app.use(passport.initialize());
app.use(passport.session());   
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));       

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
})
