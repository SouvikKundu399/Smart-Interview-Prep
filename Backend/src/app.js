import express from "express"
import cookieParser from "cookie-parser";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * @impporting routes
 */
import authRouter from "./routes/auth.routers.js";

/**
 * @using routes
 */
app.use("/api/auth", authRouter)


export default app;

