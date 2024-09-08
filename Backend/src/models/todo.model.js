import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema(
  {
    title:{
      type: String,
      required:true
    },
    content:{
      type:String,
      required: true
    },
    userId:{
      type:String
    }
  }
)


export const Todo = mongoose.model("Todo" , todoSchema)