import express from 'express'

import  createProjectController  from './controllers/Project.controlelr.js';


import cors from "cors";

const app = express();





app.use(cors())

app.use(express.json());


app.post('/projects', createProjectController)

app.listen(3000, () =>{
    console.log(`Server is running on http://localhost:3000`);
})