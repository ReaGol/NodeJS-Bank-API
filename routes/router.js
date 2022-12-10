import { Router } from "express";
import { addNewUser, getAllUsers, getUserById, updateCredit } from "../controllers/controller.js";
export const router = Router();


router.get('/users',getAllUsers)
router.post('/users', addNewUser)
//by ID
router.get('/users/:userId', getUserById)
router.put('/users/:userId/credit', updateCredit)

