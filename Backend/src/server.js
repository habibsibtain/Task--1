import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config()

connectDB().then(
  ()=>{
    app.listen(
      process.env.PORT || 3000 , () => {
        console.log("Server listening on PORT: " , process.env.PORT || 3000)
      }
    )
  }
).catch(
  (error) => {
    console.log("Error in connecting MONGODB" , error)
  }
)