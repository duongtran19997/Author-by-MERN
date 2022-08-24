const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect = async(req,res,next) => {
    let token
    console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try{
            //Get token
            token = req.headers.authorization.split(' ')[1];
            //Verify token
            const decode = jwt.decode(token, process.env.JWT_SECRET)
            //Get user from token but not get the password
            req.user = await User.findById(decode.id).select('-password')
            next()
        }catch (e) {
            console.log(e)
            res.status(401).json({message:'Not authorization'})
        }
    }
    if(!token){
        res.status(401).json({message:'Not authorization, no token'})
    }
}

module.exports = {
    protect
}