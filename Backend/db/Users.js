import mongoose from 'mongoose';
const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});
 const user= mongoose.model("users",usersSchema)

 export default user;