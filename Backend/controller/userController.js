import User from "../model/userModel.js";
import Document from "../model/documnetModel.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      gender,
      aadhaar,
      profession,
      organisation,
      password,
    } = req.body;
    const user = await User.findOne({ email });
    const user1 = await User.findOne({ aadhaar });
    if (user || user1) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hasing password
    const hashPassword = await bcryptjs.hash(password, 10);
    console.log("Error2");
    const createdUser = new User({
      name: name,
      email: email,
      phone: phone,
      dob: dob,
      gender: gender,
      aadhaar: aadhaar,
      profession: profession,
      organisation: organisation,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob.toLocaleDateString("en-GB"),
          gender: user.gender,
          aadhaar: user.aadhaar,
          profession: user.profession,
          organisation: user.organisation,
          registeredDate: user.registeredDate
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-"),
        },
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getDocs = async (req, res) => {
  try {
    const docs = await Document.find();
    res.status(200).json({
      message: "Documents Retrieved Successfully",
      docs: docs,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const changePass = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      gender,
      aadhaar,
      profession,
      organisation,
      currentpass,
      newpassword,
      confirmPassword,
    } = req.body;
    console.log("Error1");
    const user = await User.findOne({ email });
    console.log(user);
    const isMatch = await bcryptjs.compare(currentpass, user.password);

    if (user && isMatch) {
      if (newpassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      // hasing password
      const hashPassword = await bcryptjs.hash(newpassword, 10);
      user.password = hashPassword;
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.dob = dob;
      user.gender = gender;
      user.aadhaar = aadhaar;
      user.profession = profession;
      user.organisation = organisation;

      await user.save();
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const editDetail = async (req, res) => {
  try {
    const {
      name,
      newemail,
      email,
      phone,
      dob,
      gender,
      aadhaar,
      profession,
      organisation,
      password,
    } = req.body;
    const user = await User.findOne({ email });
    console.log("before is match");
    const isMatch = await bcryptjs.compare(password, user.password);
    console.log("After is match");
    if (user && isMatch) {
      if (email !== newemail) {
        user.email = newemail;
      } else {
        user.email = email;
      }
      // hasing password
      const hashPassword = await bcryptjs.hash(password, 10);
      // admin.password = hashPassword;
      user.name = name;
      user.phone = phone;
      user.dob = dob;
      user.gender = gender;
      user.aadhaar = aadhaar;
      user.profession = profession;
      user.organisation = organisation;
      user.password = hashPassword;

      await user.save();
      // res.status(200).json({ message: "Details Updated Successfully" });

      res.status(200).json({
        message: "Details Updated Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob.toLocaleDateString("en-GB"),
          gender: user.gender,
          aadhaar: user.aadhaar,
          profession: user.profession,
          organisation: user.organisation,
          registeredDate: user.registeredDate
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-"),
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const getDocById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find document by ID
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("Error fetching document details: ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};