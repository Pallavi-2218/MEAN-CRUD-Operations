var mongo = require('mongoose');
var schema = mongo.Schema;
var productSchema = new schema({
        productName:String,
        productPrice:Number,
        productCompany:String
    })
var product = mongo.model('product',productSchema);
module.exports = product;