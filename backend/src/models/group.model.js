import mongoose, {Schema} from "mongoose"

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isBookmarked: {
            type: Boolean,
            default: false
        }
    }, 
    {timestamps: true}
)

export const Group = mongoose.model("Group", groupSchema)