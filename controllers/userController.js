import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const regsiterUser = async (req, res) => {
  const data = req.body;
  try {
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = new User(data);
    let { email, username, _id, ...others } = await newUser.save();
    res.status(201).json({ email, username, _id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const decodePassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if(!decodePassword){
      return res.status(401).json({message : "Invalid Credentials"})
    }
    console.log(decodePassword)

    const token = jwt.sign({_id : existingUser._id},  process.env.JWT_SECRET );
    
    res.status(201).json({
      message : "Login Successfully",
      username : existingUser.username,
      email: existingUser.email,
      _id : existingUser._id,
      token
    })

  } catch (error) {
    return res.status(500).json(error);
  }
};
