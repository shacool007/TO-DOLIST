const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
//authentication usin gpassport 
passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user --->passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('invalid username/password');
            return done(null , false);
        }

        return done(null,user);
    })
}
));

//serialize the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
    
});

//deserialize the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding i user --->passport');
            return(err);
        }
        return done(null,user);
    });
});


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();

    }

    return res.redirect('/users/sign-in');
}

passport.checkReAuth = function(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return next();
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        
    }
    //req.user contains the current signed in user details from session cookie
    next();
}

module.exports = passport;