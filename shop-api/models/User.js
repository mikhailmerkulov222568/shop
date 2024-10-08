const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const validateUnique = async value => {
    const user = await User.findOne({email: value});
    if (user) return false;
};
const validateEmail = value => {
    const pattern = /^([a-zA-Z0-9]+[_.]?[a-zA-Z0-9])+@([a-zA-Z]{2,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if (!pattern.test(value)) return false;
};
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {validator: validateEmail, message: 'Email is not valid!'},
            {validator: validateUnique, message: 'This user is already registered'},
        ]
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    displayName: {
    type: String,
        required: true,

},
    avatar: String,

});
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.set('toJSON', {
    transform: (doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
});
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};
UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};
const User = mongoose.model('User', UserSchema);
module.exports = User;