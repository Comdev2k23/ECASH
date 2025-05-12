import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    minlength: 3, // Minimum length for username
    maxlength: 30, // Maximum length for username
    trim: true, // Trim any leading or trailing spaces
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforcing minimum password length
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0, // Prevent negative balance
  },
  transactions: {
    type: [ // Array of transactions
      {
        referenceNumber: {
          type: String,
          required: true, // Ensure reference number is always present
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        type: {
          type: String,
          enum: ['cashin', 'cashout'],
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [], // Default empty array if no transactions exist
  },
}, { timestamps: true });

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new or modified
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next();
});

// Match user password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare hashed password
};

// Create an index on the referenceNumber field for faster lookups (optional)
// Keep the index but remove the unique constraint if unnecessary
userSchema.index({ "transactions.referenceNumber": 1 });

const User = mongoose.model('User', userSchema);
export default User;
