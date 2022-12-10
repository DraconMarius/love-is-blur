//mongoose model schema
const { Schema, model } = require('mongoose');
//bcrypt for hasing pw before saving
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //regex for validate
        match: [/.+@.+\..+/, 'Must be a valid email address'],
    },
    pw: {
        type: String,
        required: true,
        minlength: 8,
    },
    matches: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Match',
        },
    ],
});

//presave Hook for PW update / new user
userSchema.pre('save', async function (next) {
    if (this.isModified('pw') || this.isNew) {
        const saltRounds = 8
        const salt = await bcrypt.genSalt(saltRounds);
        this.pw = await bcrypt.hash(this.pw, salt);
    }
    //relinquish control
    next();
});

//Making sure every instance of user can access `validate PW`
userSchema.methods.validatePW = async function (pw) {
    return bcrypt.compare(pw, this.pw);
};

//creating model from schema,
const User = model('User', userSchema);
//export
module.exports = User;
