const { sign, verify } = require("jsonwebtoken")
const jwt = require('jsonwebtoken')
const jwt_decode= require("jwt-decode");



const createTokens = (user) => {
    const accessToken = sign({ username: user.username, userflag: user.userflag}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60* 24 * 1000 });
    // const refreshToken = sign({ username: user.username}, process.env.REFRESH_TOKEN_SECRET);
    return accessToken;
};

const validateToken = (req, res, next) => {
    
    // const Tokens = req.cookies["tokens"]
    // console.log(Tokens)
    const accessToken = req.cookies["accessToken"]
    console.log(accessToken);
    
    
    if(!accessToken) return res.status(400).json({ error: "User not Authenticated"});

    try {
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(validToken.userflag);
        if(validToken){
            console.log("User Authenticated")
            req.authenticated = true
            return next();
        }
    }   catch(err){
        return res.status(400).json({ error: err});
    }    
};

// const refreshToken = (user) => {
//     const refreshToken = sign({ username: user.username}, process.env.REFRESH_TOKEN_SECRET);

//     return refreshToken;
// };
    
module.exports = {createTokens, validateToken}