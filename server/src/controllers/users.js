import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "incorrect password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmedPassword, firstName, lastName } =
    req.body;

  const existingUser = await userModel.findOne({ email: email });

  try {
    if (existingUser)
      return res.status(409).json({ message: "user already exists" });

    if (password !== confirmedPassword)
      return res.status(409).json({ message: "passwords dont match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

export const signInwithGoogle = async (req, res) => {
  const { email, givenName, familyName, imageUrl, token } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      const newGoogleUser = await userModel.create({
        email: email,
        name: `${givenName} ${familyName}`,
        imageUrl: imageUrl,
      });
      return res
        .status(200)
        .json({ profile: newGoogleUser, token: token });
    }

    res.status(200).json({ profile: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};
