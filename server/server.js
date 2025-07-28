import express from 'express'


import Project from './models/project.model.js';


const PORT = process.env.PORT || 6000;


import cors from "cors";
import mongoose from 'mongoose';


import { errorHandler } from './middleware/error-handler-middleware.js';



// Importing routes
import authRoute from './routes/auth.Routes.js';
import profileRoute from './routes/profile.routes.js';
import projectRoute from './routes/project.Routes.js';





const app = express();



mongoose.connect(process.env.MONGODB_URI , {
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






//auth routes
app.use("/auth", authRoute);



//profile routes
app.use("/profile", profileRoute);



// Project routes
app.use("/api", projectRoute)







//Get All The projects

app.get("/projects", async (req, res) => {
    try {

        res.send("Hello");

        // console.log("Hello I am inside the projects Route");
        
        // const projects = await Project.find();
        // res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})







// Get a single project by ID




app.use(errorHandler)



app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})