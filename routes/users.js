var express = require('express');
var router = express.Router();
const UserModel = require('../models/User')
const UserRolesModel = require('../models/UserRoles')
const UserMiddleware = require('../middlewares/UserMiddleware')
const passport = require('passport')

const API = {}


// user login
API.login = function (req, res, next) {
   try {
        passport.authenticate('local', {
            successRedirect:'/dashboard',
            failureRedirect:'/login',
            failureFlash: true
        })(req, res, next);
    } catch (error) {
        console.log(error)
    }
};

// user registration and register first user as admin
async function registerUser(req, res, next){
    try {
        let role = 'ADMIN'
        const userData = req.body
        const name = userData.name;
        const email = userData.email || 'mantu@mintbook.com '
        const password = userData.password || 'Infotech@1'
        const user = {
            name: name,
            email: email,
            password:password,
            setting: {
                themeColor: '',
                favouriteTeam:  '',
                teamIcon:''
            }
        }

        // is system having any ADMIN
        const isUserAdminExist = await UserRolesModel.count({role:'ADMIN'})

        // Register User Details 
        const addUser =  await UserModel.create(user)

        // if admin user is exist then insert normal user
        if(isUserAdminExist > 0){
            role = 'USER'
        }
        const mongoose = require('mongoose');
        const id = mongoose.Types.ObjectId(addUser._id);
        const roleData = {
            userId : id,
            role: role
        }

        // add role of a user
        const rolesData = await UserRolesModel.create(roleData)

        if(Object.keys(rolesData).length > 0){
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/register')        
    }
}



router.post('/login',  API.login);

router.get('/logout', (req, res, next)=>{
    req.logout()
    res.redirect('/login')
})
router.post('/register',  registerUser)
module.exports = router;
