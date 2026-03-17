import { pdfParse } from "pdf-parse";
import {
    generateInterviewReport,
    generateResumePdf
} from '../services/ai.service.js';
import InterviewReport from '../models/interviewReport.model.js';

/**
 * @description: Controller for handling interview report related operations, including generating interview reports and resume PDFs using AI services.
 */

const generateInterviewReportController = async (req, res) => {
    const {jobDescription,selfDescription} = req.body
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const interviewReportByAI = await generateInterviewReport({
        resume:resumeContent,
        jobDescription,
        selfDescription
    })

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })
}


/**
 * @description: controller to get interview report by interview report id
 */
const getInterviewReportByIdController = async (req, res) => {
    const {interviewId} = req.params
    const interviewReport = await InterviewReport.findOne({ _id: interviewId, user: req.user.id })
    if(!interviewReport){
        return res.status(404).json({  message: "Interview report not found." })
    }
    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}
 
/**
 * @description: get all interview reports of a user
 */
const getAllInterviewReportsController = async (req, res) => {
    const interviewReports = await InterviewReport.find({ user: req.user.id })
    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

/**
 * @description: controller to generate resume PDF using AI service
 */
const generateResumePdfController = async (req, res) => {
    const interviewReportId = req.params
    const interviewReport = await InterviewReport.findById(interviewReportId) 

    if (!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const {selfDescription,jobDescription,resume} = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

export{
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController 
}
 