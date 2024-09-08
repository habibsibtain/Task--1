import express, { urlencoded } from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))

import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/user" , userRoutes)

export {app}