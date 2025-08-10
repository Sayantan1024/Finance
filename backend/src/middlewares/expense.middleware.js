import { Expense } from "../models/expense.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const expenseId = asyncHandler( async (req, res, next) => {
    try {
        const {id} = req.params
    
        const expense = Expense.findById(id)
    
        if(!expense)
            throw new ApiError(404, "Expense not found")
    
        req.expense = expense
        next();
    } catch (error) {
        throw new ApiError(404, error?.message || "Invalid expense")
    }
})