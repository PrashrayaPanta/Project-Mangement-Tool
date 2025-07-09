import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({

    username:{
        type: String,
        required: true,
    },

    email:{
       type:String,
       trim:true,
        required:[true, "Email is required"],
        unique:[true, "Email must be unique"],
    },

    password:{
        type: String,
        required: true,
        trim:true

    },

    isAdmin:{
        type:Boolean,
        default:false
    }

  },  {

        timestamps:true

    }

);


const User = mongoose.model('User', userSchema);


export default User;