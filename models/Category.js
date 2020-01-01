var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    categoryName:  { type: String , unique: [true, 'The category name is already there.'], required: [true, 'Please enter category']}
});


const Category = module.exports =mongoose.model('categories', CategorySchema);
