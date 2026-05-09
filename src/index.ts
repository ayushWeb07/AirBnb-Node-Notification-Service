import express from "express"
import { serverConfig } from "./config/index.ts"
import v1Router from "./routers/v1/index.router.ts"
import { errorHandler } from "./middlewares/error.middleware.ts"
import { attachCorrelationId } from "./middlewares/correlation.middleware.ts"

// config app
const app = express()

// setup global middlewares
app.use(express.json())
app.use(attachCorrelationId)

// setup version routes
app.use("/api/v1", v1Router)

// setup the error middleware
app.use(errorHandler)

// spin up the server
app.listen(serverConfig.PORT, () => {
  console.log(`Server listening on http://localhost:${serverConfig.PORT}`)
})
