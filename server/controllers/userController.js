const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const User = require("../models/userModel");
const {
  registerValidation,
  loginValidation,
  emailValidation,
  passValidation,
} = require("../services/userValidation");
const sendEmail = require("../services/sendEmail");
const cloudinary = require("../services/cloudinary");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // VALIDATION
  const { error } = registerValidation({ name, email, password });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ error: "Email already exists!" });

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  // Create new user
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      day: req.body.day,
      password: hashedPassword,
      image: {
        public_id: "",
        url: "",
      },
    });
    res.json({ user: user._id, email: user.email });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  // VALIDATION
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email not found!" });

  const isValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPass) return res.status(400).json({ error: "Invalid password!" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SCRT, {
    expiresIn: "30d",
  });
  // res.header("auth-token", token).json({ token: token });
  res.header("auth-token", token).json({
    name: user.name,
    email: user.email,
    image: user.image.url,
    day: user.day,
    token: token,
  });
};

const deleteAccount = async (req, res, next) => {
  // if (req.user._id !== req.params.userId) {
  //   return res.send("Something went wrong!");
  // }

  // res.send("deleted");
  try {
    const current = await User.findById(req.user._id);

    const ImgId = current.image.public_id;

    if (ImgId) {
      await cloudinary.uploader.destroy(ImgId);
    }
    const user = await User.findByIdAndDelete(req.user._id);

    res.json({ id: user._id });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, email, image } = req.body;
  try {
    if (image.includes("base64")) {
      const current = await User.findById(req.user._id);

      const ImgId = current.image.public_id;

      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const result = await cloudinary.uploader.upload(image, {
        folder: "lingks_profile",
        gravity: "auto",
        crop: "fill",
      });

      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          name,
          email,
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
        { new: true }
      );

      res.json({
        name: user.name,
        email: user.email,
        day: user.day,
        image: user.image.url,
      });
    } else {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          name,
          email,
        },
        { new: true }
      );
      res.json({
        name: user.name,
        email: user.email,
        day: user.day,
        image: user.image.url,
      });
    }
  } catch (error) {
    next(error);
  }
};

const generateOTP = async (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ error: "Email not found, create an account first" });

  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const data = {
    email: req.body.email,
    OTP: req.app.locals.OTP,
  };

  if (req.app.locals.OTP) {
    const sent = await sendEmail(data);
    sent && res.send(true).status(200);
  }
};

const verifyOTP = async (req, res) => {
  // if verified reset session
  const { OTP } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(OTP)) {
    req.app.locals.session = true;
    return res.send(req.app.locals.session);
  }
  req.app.locals.session = false;
  return res.send(req.app.locals.session);
};

const resetPassword = async (req, res, next) => {
  // if (!req.app.locals.session)
  //   return res.status(440).send({ error: "Session expired!" });

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    await User.findOneAndUpdate(
      req.body.email,
      { password: hashedPassword },
      { new: true }
    );
    req.app.locals.session = false;
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, image, day, _id } = user;
    res.json({ name, email, image: image.url, day, _id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteAccount,
  generateOTP,
  verifyOTP,
  resetPassword,
  profile,
  updateProfile,
};
