const {body} = require('express-validator');

const validateLogin = () => {
    return [
        body('email', 'Invalid does not Empty').not().isEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'password more than 3 degits').isLength({min: 3})
    ];
}
const validateRegisterUser = () => {
    return [
        body('user.username', 'username does not Empty').not().isEmpty(),
        body('user.username', 'username must be Alphanumeric').isAlphanumeric(),
        body('user.username', 'username more than 3 degits').isLength({min: 3}),
        body('user.email', 'Invalid does not Empty').not().isEmpty(),
        body('user.email', 'Invalid email').isEmail(),
        body('user.birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
        body('user.password', 'password more than 6 degits').isLength({min: 6})
    ];
}

let validate = {
    validateRegisterUser,
    validateLogin
};

module.exports = {validate};