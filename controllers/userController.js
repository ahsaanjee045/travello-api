import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const regsiterUser = async (req, res) => {
  const data = req.body;
  try {
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10)
    data.password = hashedPassword;
    const newUser = new User(data);
    let {email, username,_id, ...others} = await newUser.save();
    res.status(201).json({email, username, _id})
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
};
