import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords does not match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async(req, res) => {
  try {
    const {userName, password} = req.body
    const user = await User.findOne({userName})
    const isPassCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPassCorrect){
         return res.status(400).json({ error: "Invalid username or password"})
    }
    generateTokenAndSetCookie(user._id, res)

    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic,
      });

  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "" , {maxAge: 0})
    res.status(200).json({message: "Logged out Successfully"})
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
