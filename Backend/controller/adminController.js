import Admin from "../model/adminModel.js";
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
    const admin = await Admin.findOne({ email });
    const admin1 = await Admin.findOne({ aadhaar });
    if (admin || admin1) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hasing password
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdAdmin = new Admin({
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
    await createdAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const isMatch = await bcryptjs.compare(password, admin.password);
    if (!admin || !isMatch) {
      return res.status(400).json({ message: "Invalid Credintials" });
    } else {
      res.status(200).json({
        message: "Login successful",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          dob: admin.dob.toLocaleDateString("en-GB"),
          gender: admin.gender,
          aadhaar: admin.aadhaar,
          profession: admin.profession,
          organisation: admin.organisation,
          registeredDate: admin.registeredDate
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-"),
          docUploaded: admin.docUploaded,
        },
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const uploadDocs = async (req, res) => {
  try {
    const { title, serialnum, content, summary, Class, adminid, uploadDate} = req.body;
    const admin = await Document.findOne({ title });
    const admin1 = await Document.findOne({ serialnum });
    if (admin) {
      return res.status(400).json({ message: "Document with the same title already exists." });
    }else if (admin1){
      return res.status(400).json({ message: "Document with the same serial number already exists." });
    }

    const createdDocument = new Document({
      title: title,
      serialnum: serialnum,
      content: content,
      summary: summary,
      Class: Class,
      adminid: adminid,
      uploadDate: uploadDate,
    });
    await createdDocument.save();
    res.status(201).json({ message: "Document Uploaded successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getDocs = async (req, res) => {
  try {
    const { adminid } = req.body;
    // const admin = await Admin.findOne({ email });
    const docs = await Document.find({ adminid });
    // const isMatch = await bcryptjs.compare(password, admin.password);
    if (!docs) {
      return res
        .status(400)
        .json({ message: "No documents uploaded by the Admin." });
    } else {
      res.status(200).json({
        message: "Retrieved documents successfully",
        numofDocuments: docs.length,
        docs: docs,
      });
    }
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
    const admin = await Admin.findOne({ email });
    const isMatch = await bcryptjs.compare(currentpass, admin.password);

    if (admin && isMatch) {
      if (newpassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      // hasing password
      const hashPassword = await bcryptjs.hash(newpassword, 10);
      admin.password = hashPassword;
      admin.name = name;
      admin.email = email;
      admin.phone = phone;
      admin.dob = dob;
      admin.gender = gender;
      admin.aadhaar = aadhaar;
      admin.profession = profession;
      admin.organisation = organisation;

      await admin.save();
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
    const admin = await Admin.findOne({ email });
    console.log("before is match");
    const isMatch = await bcryptjs.compare(password, admin.password);
    console.log("After is match");
    if (admin && isMatch) {
      if (email !== newemail) {
        admin.email = newemail;
      } else {
        admin.email = email;
      }
      // hasing password
      const hashPassword = await bcryptjs.hash(password, 10);
      // admin.password = hashPassword;
      admin.name = name;
      admin.phone = phone;
      admin.dob = dob;
      admin.gender = gender;
      admin.aadhaar = aadhaar;
      admin.profession = profession;
      admin.organisation = organisation;
      admin.password = hashPassword;

      await admin.save();
      // res.status(200).json({ message: "Details Updated Successfully" });

      res.status(200).json({
        message: "Details Updated Successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          dob: admin.dob.toLocaleDateString("en-GB"),
          gender: admin.gender,
          aadhaar: admin.aadhaar,
          profession: admin.profession,
          organisation: admin.organisation,
          registeredDate: admin.registeredDate
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-"),
          docUploaded: admin.docUploaded,
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
