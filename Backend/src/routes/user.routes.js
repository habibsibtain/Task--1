import { Router } from "express";
import { addTodo, allTodo, deleteTodo, getUser, userLogin, userLogout, userSignup } from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/signup").post(userSignup)
router.route("/login").post(userLogin)
router.route("/logout").post(authMiddleware ,userLogout)
router.route("/addtodo").post(authMiddleware ,addTodo)

router.route("/userinfo").get(authMiddleware ,getUser)
router.route("/alltodo").get(authMiddleware ,allTodo)

router.route("/deletetodo/:id").delete(authMiddleware ,deleteTodo)


export default router