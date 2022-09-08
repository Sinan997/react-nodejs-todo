const bcrypt = require("bcryptjs");
const User = require("../modal/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(404).json({ message: "Please fill all the inputs!" });
  }

  try {
    // is email existing check
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.status(409).json({ message: "This email is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = User({
      name: name,
      email: email,
      password: hashedPassword,
      tasks: [],
    });
    await newUser.save();
    res.status(201).json({
      message: "User created!",
    });
  } catch (error) {
    res.status(500).json({
      message: "user creation failed",
    });
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(404).json({ msg: "Please fill the inputs" });
  }

  try {
    // is email existing check
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(409).json({ message: "Email is not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password doesnt match" });
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        "myjwtkey",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token: token,
        expiresIn: new Date().getTime() + 1000 * 60 * 60,
      });
    }
  } catch (error) {}
};
