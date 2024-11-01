const jwt = require('jsonwebtoken');
const checkLogin = async (req, res, next) => {

    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
        try{
        const token = cookies[process.env.COOKIE_NAME];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
        } catch(err){
            res.status(500).json({
                success: false,
                error: {
                    msg: err.message
                }
            })
        }
    }else{
        res.status(401).json({
            success: false,
            error: {
                msg: "User is not logged in"
            }
        })
    }
}
module.exports = checkLogin;