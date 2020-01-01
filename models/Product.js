var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProductSchema = new Schema({
    categoryId:  { type: ObjectId },
    categoryName:{type:String},
    product:{type:String , required:true}
});


const Product = module.exports =mongoose.model('products', ProductSchema);
