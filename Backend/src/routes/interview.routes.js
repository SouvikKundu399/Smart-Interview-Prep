import { Router } from "express";
import { 
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController 
} from "../controllers/interview.controller.js";
import isAuthenticatedUser from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const interviewRouter = Router()

/**
 * @route POST /api/interview/
 * @description Route for generating an interview report, expects job description, self description and resume in the request body, returns the generated interview report.
 * @access Private
 */
interviewRouter.post("/", isAuthenticatedUser, upload.single("resume"), generateInterviewReportController)


/** * @route GET /api/interview/report/:interviewId
 * @description Route for getting an interview report by its ID, expects a valid JWT token in the cookies and the interview report ID in the URL parameters, returns the interview report if found.
 * @access Private
 */
interviewRouter.get("/report/:interviewId", isAuthenticatedUser, getInterviewReportByIdController)

/**
 * @route GET /api/interview/reports
 * @description Route for getting all interview reports of the logged in user, expects a valid JWT token in the cookies, returns an array of interview reports.
 * @access Private
 */
interviewRouter.get("/reports", isAuthenticatedUser, getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/pdf/:interviewId
 * @description Route for generating a resume PDF using AI, expects job description, self description and resume in the request body, returns the generated resume PDF as a buffer.
 * @access Private
 */
interviewRouter.get("/resume/pdf/:interviewId", isAuthenticatedUser, generateResumePdfController)

export default interviewRouter