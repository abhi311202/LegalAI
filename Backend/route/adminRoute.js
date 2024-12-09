import express from "express";
import { signup, login, uploadDocs, getDocs, changePass, editDetail, getDocById } from "../controller/adminController.js";

const router = express.Router();

router.post("/adminSignup", signup);
router.post("/adminLogin", login);
router.post("/adminDocuments", uploadDocs);
router.post("/adminDocumentsUploaded", getDocs);
router.get("/adminDocumentsUploadeds/:id", getDocById);
router.post("/adminChangePassword" , changePass);
router.post("/adminEditDetails", editDetail);
export default router;

 