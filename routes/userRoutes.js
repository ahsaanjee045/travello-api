import express from 'express'
import { regsiterUser } from '../controllers/userController.js';

const router = express.Router();

// localhost:8080/user/register
router.post("/register", regsiterUser)

export default router;