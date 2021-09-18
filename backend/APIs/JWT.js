
const { sign, verify } = require("jsonwebtoken")

const createTokens = (user) => {
    const accessToken = sign({ username: user.username}, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = sign({ username: user.username}, process.env.REFRESH_TOKEN_SECRET);
    return {"accessToken": accessToken, "refreshToken": refreshToken};
};

const validateToken = (req, res, next) => {
    const Tokens = req.cookies["tokens"]
    console.log(Tokens)
    const accessToken = Tokens["accessToken"]
    if(!accessToken) return res.status(400).json({ error: "User not Authenticated"});

    try {
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
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