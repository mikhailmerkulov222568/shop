const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
});
CategorySchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;