import mongoose, {Schema} from "mongoose"

const splitItemSchema = new Schema(
    {
        username: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number
        }
    }
)

const expenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paidBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group"
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        splitType: {
            type: String,
        },
        splitDetails: {
            type: [splitItemSchema],
        },
        notes: {
            type: String
        }
    }, 
    {timestamps: true}
)

export const Expense = mongoose.model("Expense", expenseSchema)