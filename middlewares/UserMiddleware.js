const UserRolesModel = require('../models/UserRoles')

const Middlewares  = {}

Middlewares.isAdminExist = function(req, res , next){
    try {
        UserRolesModel.find( {role:'ADMIN'} , function(err, user){
            if(err){
                console.log(err)
                req.isAdminExist = []
            }
            
            req.isAdminExist = user
                console.log(req.isAdminExist)
        })
    } catch (error) {
        console.log(error)
        req.isAdminExist = [];
    }
    next();
}

module.exports = Middlewares;