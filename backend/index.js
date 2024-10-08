import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import database from "./utils/database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path';
import laterJobRoute from './routes/laterJob.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
database.connect();

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
    origin: 'https://mern-stack-job-portal-gqgr.onrender.com',
    credentials: true,
};
app.use(cors(corsOptions));

// API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/laterJob",laterJobRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});