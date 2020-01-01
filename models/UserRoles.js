var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserRolesSchema = new Schema({
  userId:  ObjectId,
  role: String,
});


const UserRoles = module.exports =mongoose.model('user_roles', UserRolesSchema);


UserRoles.createRole = function(data, callback){
  return this.create(data , callback)
} 

