import dotenv from "dotenv";
import app from './src/app.js'
import cors from "cors"; 
import connectToDB from './src/DB/db.js'
import {generateInterviewReport} from './src/services/ai.service.js'

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 6000;
const BASE_URL = `http://localhost:${PORT}`;
app.use(cors({
    origin: BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

connectToDB();

const selfDescription = "I am a software engineer with 5 years of experience in full-stack development. I have worked on various projects using JavaScript, Python, and Java. I am passionate about learning new technologies and improving my skills.";
const jobDescription = "We are looking for a software engineer with experience in full-stack development. The ideal candidate should have strong skills in JavaScript, Python, and Java, and be able to work on various projects. The candidate should also be passionate about learning new technologies and improving their skills.";
const resume = "John Doe\nSoftware Engineer\nExperience:\n- Software Engineer at XYZ Company (2019-2024)\n- Junior Software Engineer at ABC Company (2017-2019)\nSkills:\n- JavaScript\n- Python\n- Java\nEducation:\n- Bachelor of Science in Computer Science from University of Technology (2013-2017)";
await generateInterviewReport({jobDescription, selfDescription, resume}); // Example question to test AI service


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});