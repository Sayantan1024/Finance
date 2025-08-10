import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {expenseId} from "../middlewares/expense.middleware.js"
import { createExpense, deleteExpense, getAllExpensesForUser, getExpenseById, updateExpense } from "../controllers/expense.controller.js";

const router = Router()

//verified users access expenses
router.use(verifyJWT)

router.route("/create-expense").post(createExpense)
router.route("/user-expenses").get(getAllExpensesForUser)
router.route("/get-expense").get(expenseId, getExpenseById)
router.route("/update-expense").patch(expenseId, updateExpense)
router.route("/delete-expense").delete(expenseId, deleteExpense)

export default router