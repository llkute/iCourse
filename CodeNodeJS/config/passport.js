//load all the things we need
var LocalStrategy = require('passport-local').Strategy;

//load up the user model
var User = require('../app/models/user');
var Student = require('../app/models/student');
var sessionArr = require('../config/auth.js');
//expose this function to our app using module.exports
module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user,done){
        done(null,user.username);
    });

    //used to deserialize the user
    passport.deserializeUser(function(id,done){
        Student.findOne({studentID:id},function(err,user){
            done(err,user);
        });
    });
/////////////////////////////////////LOCAL SIGNUP/////////////////////////////

    passport.use('local-signup',new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField: 'password',
        passReqToCallback: true //allows us to pass back the entire request to the callback
    },
    function(req,username,password,done){
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function(){

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
            User.findOne({'username':username},function(err,user){
                if(err)
                    return done(err);

                // check to see if theres already a user with that email
                if(user){
                    return done(null,false,req.flash('signupMessage','That email is already taken.'));
                }else{
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null,newUser);
                    });
                }
            });
        });
    }));
/////////////////////////////////////LOCAL LOGIN/////////////////////////////

    passport.use('local-login',new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req,username,password,done){
        for(var i=0;i<sessionArr.length;i++){
            if(sessionArr[i]==username)
                return done(null,false,req.flash('loginMessage','Bạn đã đăng nhập'));
    }
        User.findOne({'username':username},function(err,user){
            if(err)
                return done(err);

            if(!user)
                return done(null,false,req.flash('loginMessage','Tên đăng nhập không đúng'));

            if(!user.validPassword(password))
                return done(null,false,req.flash('loginMessage','Mật khẩu không đúng'));

            sessionArr.push(user.username);
            return done(null,user);
        });
    }));
};
