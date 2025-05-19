import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    fullName: String,
    age: {
        type: Number,
        min: 10,
        max: 120
    },
    username: {
        type: String,
        unique: true
    },
    password: String
});

let User = mongoose.model("User",UserSchema);
export default User