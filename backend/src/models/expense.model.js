import mongoose, {Schema} from "mongoose"

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
        splitType: {
            type: String,
        }
    }, 
    {timestamps: true}
)

export const Expense = mongoose.model("Expense", expenseSchema)