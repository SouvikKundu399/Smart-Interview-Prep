import Router from "express";
import { 
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController
 } from '../controllers/auth.controller.js';

 import isAuthenticatedUser from "../middlewares/auth.middleware.js";

 const authRouter = Router()

 /**
  * @route POST /api/auth/register
  * @description Route for registering a new user, expects username, email, password and an optional profile picture in the request body.
  * @access Public
  */

 authRouter.post("/register",registerUserController)

/**
 * @route POST /api/auth/login
 * @description Route for logging in a user, expects email and password in the request body.
 * @access Public
 */
authRouter.post("/login", loginUserController)


/**
 * @route get /api/auth/logout
 * @description Route for logging out a user, expects a valid JWT token in the cookies, blacklists the token and clears the cookie.
 * @access Private
 */
authRouter.get("/logout", isAuthenticatedUser, logoutUserController)


/** 
 *  @route get /api/auth/get-me
 * @description Route for getting the current logged in user, expects a valid JWT token in the cookies, verifies the token and returns the user data.
 * @access Private
 */
authRouter.get("/get-me", isAuthenticatedUser, getCurrentUserController)


export default authRouter
  