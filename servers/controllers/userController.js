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
  // VALIDATION
  const { error } = registerValidation(req.body);
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
      password: hashedPassword,
      image: {
        public_id: "",
        url: "",
      },
    });
    res.json({ user: user._id });
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

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SCRT);
  res.header("auth-token", token).json({ token: token });
};

const deleteAccount = async (req, res, next) => {
  try {
    const current = await User.findById(req.params.id);

    const ImgId = current.image.public_id;

    if (ImgId) {
      await cloudinary.uploader.destroy(ImgId);
    }
    const user = await User.findByIdAndDelete(req.params.id);

    res.json({ Deleted: user._id });
  } catch (error) {
    next(error);
  }
};
const uploadPicture = async (req, res, next) => {
  const { image, _id } = req.body;
  try {
    // delete prev image to cloudinary
    if (image !== "") {
      const current = await User.findById(_id);

      const ImgId = current.image.public_id;

      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "pictures",
    });

    const user = await User.findByIdAndUpdate(_id, {
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).send(user);
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
    sent && res.send().status(200);
  }
};

const verifyOTP = async (req, res) => {
  // if verified reset session
  const { OTP } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(OTP)) {
    req.app.locals.session = true;
    return res.send(req.app.locals.session);
  }
  return res.send(req.app.locals.session);
};

const resetPassword = async (req, res, next) => {
  const { error } = passValidation({ password: req.body.password });
  if (error) return res.status(400).json({ error: error.details[0].message });

  if (!req.app.locals.session)
    return res.status(440).send({ error: "Session expired!" });

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const user = await User.findOneAndUpdate(
      req.body.email,
      { password: hashedPassword },
      { new: true }
    );
    res.json(user.data);
    req.app.locals.session = false;
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, image, _id } = user;
    res.send({ name, email, image: image.url, _id });
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
  getMe,
  uploadPicture,
};
