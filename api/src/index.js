const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const {protect} = require('./middlewares/auth')
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get("/",protect, (req, res) => {
    console.log('123')
    return res.status(200).json({message:'home'})
})

app.use('/api/users',require('./routes/userRoute'))

connectDB();
app.listen(PORT, () => {
    console.log("You are listening on port " + PORT);
})
