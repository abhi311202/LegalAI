import express from "express";
import {
  signup,
  login,
  getDocs,
  changePass,
  editDetail,
  getDocById
} from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/Documents", getDocs);
router.get("/Document/:id", getDocById);
router.post("/changepassword", changePass);
router.post("/editdetails", editDetail);
export default router;
