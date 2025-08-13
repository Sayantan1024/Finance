import mongoose from "mongoose"
import { Expense } from "../models/expense.model.js"
import {Group} from "../models/group.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createGroup = asyncHandler( async (req, res) => {
    const {name, members, createdBy, isBookmarked} = req.body

    if(!name || !members || !createdBy)
        throw new ApiError(400, "Required details not given")

    const group = await Group.create({
        name,
        members: members || [],
        createdBy,
        isBookmarked: isBookmarked || false
    })

    if(!group)
        throw new ApiError(500, "Error while creating group")

     return res
     .status(201)
     .json(new ApiResponse(201, group, "Group created successfully"))
})

const getAllGroupsForUser = asyncHandler( async (req, res) => {
    const group = await Group.find({
        members: req.user?._id
    })

    if(!group) 
        throw new ApiError(404, "No groups found for user")

    return res
    .status(200)
    .json(new ApiResponse(200, group, "Groups for user fetched successfully"))
})

const getGroupById = asyncHandler( async (req, res) => {
    const {groupId} = req.params

    const group = await Group.findById(groupId)

    if(!group)
        throw new ApiError(404, "Error in fetching group")

    return res
    .status(200)
    .json(new ApiResponse(200, group, "Group fetched successfully"))
})

const updateGroup = asyncHandler( async (req, res) => {
    const {groupId} = req.params
    const {name, members, isBookmarked} = req.body

    if(!name && !members && !isBookmarked)
        throw new ApiError(400, "Details are required")

    const newGroup = await Group.findByIdAndUpdate(
        groupId,
        {
            $set: {
                ...(name && {name}),
                ...(members && {members}),
                ...(isBookmarked!==null && {isBookmarked})
            }
        },
        {new: true}
    )

    if(!newGroup)
        throw new ApiError(404, "Group not found")

    return res
    .status(200)
    .json(new ApiResponse(200, newGroup, "Group updated successfully"))
})

const deleteGroup = asyncHandler( async (req, res) => {
    const {groupId} =  req.params

    const deletedGroup = await Group.findByIdAndDelete(groupId)

    if(!deletedGroup)
        throw new ApiError(404, "Group not found")

    return res
    .status(200)
    .json(new ApiResponse(200, deletedGroup, "Group deleted successfully"))
})

const toggleBookmark = asyncHandler( async (req, res) => {
    const {groupId} = req.params
    const userId = req.user?._id

    const user = await User.findById(userId)
    if(!user)
    throw new ApiError(404, "User not found")

    const group = await Group.findById(groupId)
    if(!group)
    throw new ApiError(404, "Group not found")

    const idx = user.bookmarkedGroups.indexOf(groupId)

    if(idx == -1) {
        user.bookmarkedGroups.push(groupId)
        await user.save();
        return res
        .status(200)
        .json(new ApiResponse(200, {isBookmarked: true}, "Group bookmarked successfully"))
    }
    else {
        user.bookmarkedGroups.splice(idx, 1)
        await user.save();
        return res
        .status(200)
        .json(new ApiResponse(200, {isBookmarked: false}, "Group bookmark removed"))
    }
})

const getGroupExpenses = asyncHandler( async (req, res) => {
    const {groupId} = req.params

    const expenses = await Expense.aggregate([
        {
            $match: {groupId: new mongoose.Types.ObjectId(groupId)}
        },
        {
            $lookup: {
                from: "users",
                localField: "paidBy",
                foreignField: "_id",
                as: "paidByDetails"
            }
        },
        {
            $unwind: "$paidByDetails"
        },
        {
            $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "participantDetails"
            }
        },
        {
            $project: {
                groupId: 0
            }
        }
    ])

    if(!expenses?.length)
        throw new ApiError(404, "Group expenses does not exist")

    return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Group expenses fetched successfully"))
})

//Finish this function (who owes/owed) with aggregation
const getGroupExpenseSummary = asyncHandler( async (req, res) =>{

})

export {createGroup, getAllGroupsForUser, getGroupById, updateGroup, deleteGroup, toggleBookmark, getGroupExpenses, getGroupExpenseSummary}