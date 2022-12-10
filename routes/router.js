import { Router } from "express";
import { addNewUser, depositMoney, getAllUsers, getUserById, transferMoney, updateCredit, withdrawMoney } from "../controllers/controller.js";
export const router = Router();


router.get('/users',getAllUsers)
router.post('/users', addNewUser)
//by ID
router.get('/users/:id', getUserById)
router.put('/users/:id', updateCredit)

//actions
router.put('/actions/deposit/:id', depositMoney)
router.put("/actions/withdraw/:id", withdrawMoney);
router.put("/actions", transferMoney);

