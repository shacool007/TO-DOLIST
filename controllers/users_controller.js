const User = require('../models/user');
module.exports.profile  = function(req,res){
    User.findOne ({_id:req.cookies.user_id},function(err,user){
        if(err){
            console.log("error in fetching the user while showing user profile");
            return;
        }
        if(user){
            return res.render('home',{title:"users",name:user.name,email:user.email});                          
        }
        else{
            return res.redirect('back');
        }
    })
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
    // find the users
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user while signing in');
        }

        if(user){
            if(user.password==req.body.password){
                res.cookie('user_id',user.id);
                
                return res.redirect('/users/profile');
            }
            
            
            return res.redirect('back')
            

        }else{
            //handle user not found

            return res.redirect('back');
            
        }
    })
}

