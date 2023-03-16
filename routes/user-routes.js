import express from 'express';
import { getAllUser, signup, login} from '../controllers/user-controller.js';

import { verifyUserToken, IsAdmin, IsUser } from '../middleware/auth.js';
const router = express.Router();

router.get("/", verifyUserToken,IsAdmin,getAllUser);
router.post("/signup", signup);

router.post("/login", login);
export default router;