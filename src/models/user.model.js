import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//direct encrypt karna possiable hai nae toh hume help leni padti hai moongoose ke hooks ki 

const userSchema = new Schema(
    {
        username: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true , 
            index : true
        },
        
        email: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true , 
        },
         
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String, //cloudinary url 
            required : true,
        },
        
        coverImage : {
            type : String
        },

        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            },
        ],
        password: {
            type : String, //password encrupt rakho
            //db mei jab bhi pass rakho encrupt kar ke rakho , par encrupt toh kar ke nahi rakh sakte qki appka password kya hai, agar aapne 123 likha hai, aur waha pe badi encrupt string hai toh compare kaise karege toh yeh 1 challenge hai humare samne jisse solve karege 
            required : [true, "Password is Required"]
        },
        refreshToken: {
            type : String
        }
    },{
        timestamps : true
    }
        
)
userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next()
        
        this.password = bcrypt.hash(this.password, 10)
        next()

        // bcrypt behind the scene boht saare kaam karta hai 
        // encryption etc are complext process means algo will run and time will take,  cpu processing that's this function written in async function    
})    

// custom method design

userSchema.methods.isPasswordCorrect = async function (password) {
  return await  bcrypt.compare(password, this.password)
    
}
// you can build method for access tokens generate 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
//both are jwt tokens and there is only usage diferent     

export const User = mongoose.model("User", userSchema)

//jwt ek bearor token hai 