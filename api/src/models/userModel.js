const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        username: {
            type: 'string', required: [true, 'Please add a name'], unique: true
        },
        email: {
            type: 'string', required: [true, 'Please add a email'], unique: true
        },
        password: {
            type: 'string', required: [true, 'Please add a password']
        },
        phoneNumber: {
            type: 'number'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User',userSchema);