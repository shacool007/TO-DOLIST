const User = require('../models/user');
module.exports.profile  = function(req,res){
    res.render('profile',{title:"users"})                          
}

module.exports.signUp = function(req,res){
    res.render('sign-up',{
        title:"Codeial/Sign Up"
    })
}

module.exports.signIn = function(req,res){
    res.render('sign-in',{
        title:"Codeial/Sign in"
    })
}

module.exports.signOut = function(req,res){
    req.logout();   
    res.redirect('/users/sign-in');
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_pwd){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding the user while signing up");
            return;
        }
        if(!user){
            User.create(req.body,function(err){
                if(err){
                    console.log("error in creating the user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');

            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

