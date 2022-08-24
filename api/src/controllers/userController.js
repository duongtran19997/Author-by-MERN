const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const {validationResult} = require('express-validator');
const saltRound = process.env.SALT;

//register new User by POST /api/users/register
const registerUser = async(req,res)=>{
    const {username,email,password,phoneNumber} = req.body

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).
        json({errors:[{msg:'User already exists'}]})
    }
    //hash password
    const salt =  bcrypt.genSaltSync(Number(saltRound));
    const hashedPassword =  bcrypt.hashSync(password, salt);

    //create new user
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        phoneNumber
    });

    if(user){
        res.status(201).json({
            id:user._id,
            username:user.username,
            email:user.email,
            phoneNumber:user.phoneNumber
        })
    }else{
        res.status(400).json({message:'Invalid user data'})
    }
}

//Login User by POST /api/users/login
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    //check validateLogin
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({ errors: errors.array() });
        return;
    }

    //Check user by email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id:user._id,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).json({message:'Invalid credentials'})
    }
}

//get User data by GET /api/users/me
const getUser = async(req,res)=>{
    const jwt = req.headers.authorization.split(' ')[1]
    const decode = jwt_decode(jwt)
    const {_id,email} = await User.findById(decode.id)

    if(email){
        res.status(200).json({
            id: _id,
            email: email
        })
    }else{
        res.status(400).json({message:'Invalid'});
    }
}

const getUserByEmail =async (req,res) =>{
    const checkEmail = req.params.email;
    const user = await User.findOne({ email:checkEmail})
    if(user){
        res.status(200).json({username:user.username, email:user.email})
    }else{
        res.status(200).json({
            message:'User not found'
        })
    }
};

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    getUser,
    loginUser,
    getUserByEmail
}