import mongoose, {Schema} from "mongoose"

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        createdBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        members: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        isBookmarked: {
            type: Boolean
        }
    }, 
    {timestamps: true}
)

export const Group = mongoose.model("Group", groupSchema)