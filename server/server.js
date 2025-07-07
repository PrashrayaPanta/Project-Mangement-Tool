import express from 'express'




import  ProjectController  from './controllers/Project.controlelr.js';


import cors from "cors";
import mongoose from 'mongoose';

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


app.post('/projects', ProjectController)

app.listen(3000, () =>{
    console.log(`Server is running on http://localhost:3000`);
})