import { Router } from "express"
import userRouter from "./users.router.ts"

const router= Router()

// setup all app routes
router.use("/users", userRouter)

export default router