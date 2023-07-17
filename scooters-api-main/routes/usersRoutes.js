import express from "express";
import {
  login,
  forgetPassword,
  findoutToken,
  NewPassword,
  profile,
  editUsers,
  editProfile,
  ChangeState,
  registerCustomers,
  registerAdmins,
  getCustomers,
  getAdmins,
  getCustomer,
  getAdmin,
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/customers", registerCustomers);
router.post("/admins", checkAuth, registerAdmins);
router.route("/profile").get(checkAuth, profile).put(checkAuth, editProfile);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(findoutToken).post(NewPassword);
router.get("/customers", checkAuth, getCustomers);
router.get("/admins", checkAuth, getAdmins);
router.put("/:id", checkAuth, editUsers);
router.get("/customers/:id", checkAuth, getCustomer);
router.get("/admins/:id", checkAuth, getAdmin);
router.post("/changestate", checkAuth, ChangeState);

export default router;
