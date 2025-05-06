import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    balance:{
        type: Number,
        required: true,
        default: 0,
        min: 0, //to prevent negative balance
    },
    transactions: [{
        referenceNumber: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0, //to prevent negative amount
        },
        type: {
            type: String,
            enum: ['cashin', 'cashout'],
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema)
export default User
