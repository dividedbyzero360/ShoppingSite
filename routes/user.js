var express = require('express');
var router = express.Router();
var passport=require("passport");
var csurf=require("csurf");
var csrfProtection=csurf();
router.use(csrfProtection);

router.get("/signup",checkAuthentication,function(req,res,next){
    var messages=req.flash('error');
    res.render("user/signup",{csrfToken:req.csrfToken(),messages,hasError:messages.length > 0});
});

router.post("/signup",checkAuthentication, passport.authenticate('local.signup',{
    successRedirect:"/user/profile",
    failureRedirect:"/user/signup",
    failureFlash:true
}));

router.get("/signin",checkAuthentication,function(req,res,next){
    var messages=req.flash('error');
    res.render("user/signin",{csrfToken:req.csrfToken(),messages,hasError:messages.length > 0});
});

router.post("/signin",checkAuthentication, passport.authenticate('local.signin',{
    successRedirect:"/user/profile",
    failureRedirect:"/user/signin",
    failureFlash:true
}));

router.get("/logout",isLoggedIn,function(req,res,next){
    req.logout();
    res.redirect("/");
});

router.get("/profile",isLoggedIn,function(req,res,next){
    res.render("user/profile")
});

function checkAuthentication(req,res,next){
    //req.isAuthenticated() works when passport.session() is used as a middleware.
    if(!req.isAuthenticated()){
      return next();
    }else{
      res.redirect("/");
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.redirect("/");
    }
}

module.exports = router;  