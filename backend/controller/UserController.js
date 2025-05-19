import User from "../Models/User.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"


export async function login(req,res)
{
        let user = await User.findOne({username:req.body.username});
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        
        if (bcrypt.compareSync(req.body.password,user.password )) {
    
            const Token = await jwt.sign(
                {
                    username: user.username,
                    id: user._id,
                    age: user.age
                },
                process.env.JWT_Secrate
            )
    
            console.log(Token);
    
            return res.json({
                token: Token,
                user: {
                    fullName: user.fullName,
                    username: user.username,
                    age: user.age
                }
            });
        }
        
        return res.status(401).json({ message: "Incorrect Password!" });
}


export async function SignUp(req,res) {
    try {
      let { fullName, age, username, password } = req.body;
  
      // Validate required fields
      if (!fullName || !age || !username || !password) {
        return res.status(400).json({ 
          message: false, 
          error: "All fields are required" 
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ 
          message: false, 
          error: "Username already exists" 
        });
      }
  
      // Hash the password
      let hashedPassword = bcrypt.hashSync(password, 10);
  
      // Create a new user
      let user = new User({
        fullName,
        age: Number(age),
        username,
        password: hashedPassword
      });
  
      await user.save();
  
      return res.json({ 
        message: true, 
        user: {
          fullName: user.fullName,
          username: user.username,
          age: user.age
        }
      });
    } catch (err) {
      console.error("SignUp Error:", err);
      return res.status(500).json({ 
        message: false, 
        error: err.message || "Something went wrong" 
      });
    }
  }
