import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const authMiddleware = async (req , _ , next) => {
  const token = req.header("Authorization").replace("Bearer " , "")
  try {
    const decoded = jwt.verify(token , process.env.SECRET_KEY)
    const user = await User.findOne({_id: decoded.userId})

    if(!user) throw new Error()
  
    req.user = user
    next()
  } catch (error) {
    console.log("Error in authenticating user." , error)
  }
}

export default authMiddleware