import express from 'express'




import  ProjectController  from './controllers/Project.controlelr.js';



import Project from './models/project.model.js';


import cors from "cors";
import mongoose, { get } from 'mongoose';
import CreateProjectController from './controllers/Project.controlelr.js';

const app = express();



mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
}
)
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
}
);






app.use(cors())

app.use(express.json());


app.post('/projects', CreateProjectController)



app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(3000, () =>{
    console.log(`Server is running on http://localhost:3000`);
})