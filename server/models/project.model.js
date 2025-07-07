import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectSchema = new Schema({

    title:{
        type: String,
        required: true,
        trim:true
    },

    deadline:{
        type: Date
    },

    tasks: [
        {
            title:{
                type: String,
            },


            status: {
                type: String,
                enum: ['Todo', 'Doing', 'Completed'],
                default: 'Todo',
            },


            description:{
                type: Date
            },


            deadline:{
                type: String
            }

        }

    ],

  },  {

        timestamps:true

    }

);


const Project = mongoose.model('Project', projectSchema);


export default Project;