import { Expense } from "../models/expense.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const createExpense = asyncHandler( async (req, res) => {
    const {title, amount, paidBy, group, participants, splitType, splitDetails, notes} = req.body

    if(!title || !amount || !paidBy)
        throw new ApiError(400, "Required details not given")

    const expense = await Expense.create({
        title,
        amount,
        paidBy,
        group: group || null,
        participants: participants || [],
        splitType: splitType || "equal",
        splitDetails: splitDetails || [],
        notes: notes || ""
    })

    if(!expense)
        throw new ApiError(500, "Error while creating an expense")

    const populateExpense = await Expense.findById(expense?._id)
    .populate("paidBy", "name email")
    .populate("participants", "name email")
    
    return res
    .status(201)
    .json(
        new ApiResponse(201, populateExpense, "Expense Created successfully")
    )  
})

const getAllExpensesForUser = asyncHandler( async (req, res) => {
    const userExpense = await Expense.find({
        $or: [
            {paidBy: req.user?._id},
            {participants: req.user?._id}
        ]
    })

    if(!userExpense || userExpense.length === 0)
        throw new ApiError(404, "No expenses found for this user")

    return res
    .status(200)
    .json(new ApiResponse(200, userExpense, "All expenses for user fetched successfully"))
})

const getExpenseById = asyncHandler( async (req, res) => {
    const expense = await Expense.findById(req.expense?._id).populate("paidBy", "name")

    if(!expense)
        throw new ApiError(404, "Expense not found")

    return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense fetched successfully"))
})

const updateExpense = asyncHandler( async (req, res) => {
    const {title, amount, paidBy, participants, notes} = req.body

    if(!title && !amount && !paidBy && !participants && !notes)
        throw new ApiError(400, "All fields are required")

    const updateFields = {}
    if(title) updateFields.title = title
    if(amount) updateFields.amount = amount
    if(paidBy) updateFields.paidBy = paidBy
    if(participants) updateFields.participants = participants
    if(notes) updateFields.notes = notes


    const newExpense = await Expense.findByIdAndUpdate(
        req.expense?._id,
        {
            $set: updateFields
        },
        {new: true}
    )

    if(!newExpense)
        throw new ApiError(404, "Expense not found")

    return res
    .status(200)
    .json(new ApiResponse(200, newExpense, "Expense updated successfully"))
})

const deleteExpense = asyncHandler( async (req, res) => {
    const deletedExpense = await Expense.findByIdAndDelete(
        req.expense?._id
    )

    if(!deletedExpense)
        throw new ApiError(404, "Expense not found")

    return res
    .status(200)
    .json(new ApiResponse(200, deletedExpense, "Expense deleted successfully"))
})

export {createExpense, getAllExpensesForUser, getExpenseById, updateExpense, deleteExpense}