import User from '../models/user.model.js'
import TokenBlacklist from '../models/tokenBlacklist.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * @name registerUserController
 * @description Controller for registering a new user,expects username, email and password in the request body, hashes the password and saves the user to the database.
 * @access Public
 */

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const alreadyExistingUser = await User.findOne({ $or: [{ email }, { username }] })


    if (alreadyExistingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(201).json({ message: "User registered successfully" })

}

/**
 * @name loginUserController
 * @description Controller for logging in a user, expects email and password in the request body, checks if the user exists and if the password is correct, then generates a JWT token and sends it as a cookie.
 * @access Public
 */

const loginUserController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "User does not exist" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: "User logged in successfully" })
}



/**
 * @name logoutUserController
 * @description Controller for logging out a user, expects the JWT token in the cookies, adds the token to the blacklist and clears the cookie.
 * @access Public
 */
const logoutUserController = async (req, res) => {
    const token = req.cookies.token

    if (token) {
        await TokenBlacklist.create({ token })
    }
    res.clearCookie("token")
    return res.status(200).json({ message: "User logged out successfully" })
}


/**
 * @name getCurrentUserController
 * @description Controller for getting the current logged in user, expects the JWT token in the cookies, verifies the token and returns the user data.
 * @access Private
 */

const getCurrentUserController = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}





export { 
    registerUserController, 
    loginUserController, 
    logoutUserController, 
    getCurrentUserController 
}