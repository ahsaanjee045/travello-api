import express from 'express'
import { loginUser, regsiterUser } from '../controllers/userController.js';

const router = express.Router();

// localhost:8080/user/register
router.post("/register", regsiterUser)
router.post("/login", loginUser)

export default router;