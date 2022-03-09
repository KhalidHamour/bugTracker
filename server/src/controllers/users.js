import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const emailLogin = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "incorrect password" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXP_IN,
    });

    const profile = {
      imageUrl: existingUser.imageUrl,
      email: existingUser.email,
      name: existingUser.name,
      projects: existingUser.projects,
      _id: existingUser._id,
      __v: existingUser.__v,
    };

    res.status(200).json({ profile, token });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

export const emailSignUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, familyName } = req.body.data;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) return res.status(409).json({ message: "user already exists" });

    if (password !== confirmPassword) return res.status(409).json({ message: "passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${familyName}`,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXP_IN,
    });

    const profile = {
      imageUrl: user.imageUrl,
      email: user.email,
      name: user.name,
      projects: user.projects,
      _id: user._id,
      __v: user.__v,
    };

    res.status(200).json({ profile, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signInwithGoogle = async (req, res) => {
  const { email, givenName, familyName, imageUrl, token, googleId } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      const newGoogleUser = await userModel.create({
        googleId: googleId,
        email: email,
        name: `${givenName} ${familyName}`,
        imageUrl: imageUrl,
      });
      return res.status(200).json({ profile: newGoogleUser, token: token });
    }

    res.status(200).json({ profile: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};
