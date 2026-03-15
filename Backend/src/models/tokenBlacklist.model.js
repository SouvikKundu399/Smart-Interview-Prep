import mongoose from 'mongoose'

const tokenBlacklistSchema = new mongoose.Schema({
    token : {
        type: String,
        required: [true,"Token must not be empty"],
    }
    },{
        timestamps: true
})

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema)

export default TokenBlacklist