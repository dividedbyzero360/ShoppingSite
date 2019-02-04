const express = require('express');
const session=require("express-session");
const flash=require("connect-flash");
const expressHsb=require("express-handlebars");
const mongoose=require("mongoose");
const MongoStore=require("connect-mongo")(session);
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const path = require('path');
const passport=require("passport");
var validator=require("express-validator");
require("./config/passport");
mongoose.connect("mongodb://localhost:27017/shopping-new", { useNewUrlParser: true });

var app = express();

app.engine(".hbs",expressHsb({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());

app.use(session(
    {
      secret:"mySecretKey",
      resave:false,
      saveUninitialized:false,
      store:new MongoStore({mongooseConnection:mongoose.connection}),
      cookie:{maxAge:180*60*1000}
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //persistent login session
app.use(function(req,res,next){
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    req.next();
});  

app.use('/', indexRouter);  
app.use('/user', userRouter);
app.listen(5000, () => console.log('Express Server Now Running On localhost:5000'));