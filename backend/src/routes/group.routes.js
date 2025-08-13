import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createGroup, deleteGroup, getAllGroupsForUser, getGroupById, getGroupExpenses, getGroupExpenseSummary, toggleBookmark, updateGroup } from "../controllers/group.controller";

const router = Router()

router.use(verifyJWT)

router.route("/create-group").post(createGroup)
router.route("/user-groups").get(getAllGroupsForUser)
router.route("/get-group").get(getGroupById)
router.route("/update-group").patch(updateGroup)
router.route("/delete-group").delete(deleteGroup)

router.route("/toggle-group").post(toggleBookmark)

router.route("/group-expenses").get(getGroupExpenses)
router.route("/group-expense-summary").get(getGroupExpenseSummary)

export default router