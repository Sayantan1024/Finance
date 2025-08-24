import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

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

groupSchema.plugin(mongooseAggregatePaginate)

export const Group = mongoose.model("Group", groupSchema)