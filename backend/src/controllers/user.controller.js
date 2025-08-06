import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Error in generating tokens")
    }
}

const registerUser = asyncHandler( async (req,res) => {
    const {username, email, password} = req.body

    if( [username, email, password].some((field) => field?.trim() === "") )
        throw new ApiError(400, "All fields required")

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser)
        throw new ApiError(409, "User with email or username already exists")

    const user = User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
        throw new ApiError(500, "Error while registering user")

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    if(!email)
        throw new ApiError(400, "Email is required")

    const user = User.findOne({email})

    if(!user)
        throw new ApiError(404, "User does not exist")

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
        throw new ApiError(401, "Invalid user credentials")

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken)
        throw new ApiError(401, "Unauthorized request")

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if(!user)
            throw new ApiError(401, "Invalid refresh token")

        if(incomingRefreshToken !== req.user?.refreshToken)
            throw new ApiError(401, "Refresh token expired")

        const {accessToken, newRefreshToken} = generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getCurrentUser = asyncHandler( async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
})

const updateAccountDetails = asyncHandler( async (req, res) => {
    const {username, email} = req.body

    if(!username && !email)
        throw new ApiError(400, "All fields required")
    
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email
            }
        },
        {new: true}
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const changePassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body

    if(newPassword !== confirmPassword)
        throw new ApiError(400, "New and cofirm password don't match")

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect)
        throw new ApiError(400, "Invalid password")

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

export {registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetails, changePassword}