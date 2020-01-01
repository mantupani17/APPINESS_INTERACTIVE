var express = require('express');
var router = express.Router();
const API = {}
const {ensureAuthenticated} = require('../config/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs', { title: 'Express' });
});

API.login = function(req, res){
    res.render('login.ejs',{title:'Login | Testing'})
}

API.register = function(req, res){
    res.render('register.ejs',{title:'Register | Appines Interactive'})
}
API.dashboard = function(req, res){
    res.render('dashboard.ejs',{title:'Dashboard | Appines Interactive' , user:req.user.email})
}
API.addCategory = function(req, res){
    res.render('add-category.ejs',{title:'Add Category | Appines Interactive' , user:req.user.email})
}
API.addProducts = function(req, res){
    res.render('add-products.ejs',{title:'Add Products | Appines Interactive' , user:req.user.email})
}
API.portFolio = function(req, res){
    res.render('portfolio.ejs',{title:'Portfolio | Appines Interactive' , user:req.user.email})
}




router.get('/login', API.login);
router.get('/register', API.register);
router.get('/dashboard', API.dashboard);
router.get('/port-folio', API.portFolio);
router.get('/add-category', API.addCategory);
router.get('/add-products', API.addProducts);
module.exports = router;