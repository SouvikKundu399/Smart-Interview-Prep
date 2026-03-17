import TokenBlacklist from "../models/tokenBlacklist.model.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


const isAuthenticatedUser = async(req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized, no token provided"
        })
    }

    const isTokenBlacklisted = await TokenBlacklist.findOne({ token })


    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Unauthorized, token is blacklisted"
        })
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedUser.id)
        if(!user){
            return res.status(401).json({
                message: "Unauthorized, user not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, invalid token"
        })
    }
    
}

export default isAuthenticatedUser