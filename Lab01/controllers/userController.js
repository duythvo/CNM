import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret_key =
  process.env.JWT_SECRET ||
  "f879e5c66a010de172caebbfb45e0278cd13b155e608bebadf3dc13ddc310e10";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("register", { error: "Please enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.render("register", { error: "Invalid email" });
    }

    if (password.length < 8) {
      return res.render("register", {
        error: "Password must be at least 8 characters",
      });
    }

    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.render("register", { error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.redirect("/");
  } catch (err) {
    res.render("register", { error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Please enter all fields" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid password" });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.redirect("/products");
  } catch (err) {
    res.render("login", { error: err.message });
  }
};

const getProfile = async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: { exclude: ["password"] },
  });
  res.json(user);
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export { registerUser, loginUser, getProfile, logout };
