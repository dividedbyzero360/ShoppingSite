var express = require('express');
var router = express.Router();
var Product=require('../models/product');
var Cart=require("../models/cart");

router.get('/', function(req, res, next) {
    console.log(req.user);
    var successMsg = req.flash('success')[0];
    Product.find(function(err,docs){
        var productChunks=[];
        var chunksize=3;
        for(let i=0;i<docs.length;i+=chunksize){
          productChunks.push(docs.slice(i,i+chunksize));
        }
        res.render('shops/index', { title: 'Express' ,products: productChunks,successMsg: successMsg, noMessages: !successMsg});
      });
});


router.get("/add-to-cart/:id",(req,res,next)=>{
    var productId=req.params.id;
    var cart= new Cart(req.session.cart ? req.session.cart:{});
    Product.findById(productId,function(err,product){
      if(err){
        return res.redirect("/");
      }else{
        cart.add(product,product.id);
        req.session.cart=cart;
        var totalItems=req.session.cart.totalQty;
        return res.json({isSuccess:true,successMessage:"Product sucessfully added to cart", totalCount:totalItems});
      }
    })
  });
  
  router.get("/shopping-cart",(req,res,next)=>{
    if(!req.session.cart){
      return res.render('shops/shopping-cart',{products:null});
    }else{
      var cart=new Cart(req.session.cart);
      return res.render('shops/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice});
    }
  });  

  router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shops/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
  });


  router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    console.log(req.user);
    // Stripe Code.
    var cart = new Cart(req.session.cart);
  //   var order = new Order({
  //     user: req.user,
  //     cart: cart,
  //     address: req.body.address,
  //     name: req.body.name,
  //     paymentId: charge.id
  // });
  // order.save(function(err, result) {
  //     req.flash('success', 'Successfully bought product!');
  //     req.session.cart = null;
  //     res.redirect('/');
  // });
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
  }

module.exports = router;