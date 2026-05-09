import type { Request, Response, NextFunction } from "express"
import type { AppError } from "../utils/errors/app.error.ts"

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        name: err.name,
        stackTrace: err?.stack ?? "No stack trace present"
    })
}

export {errorHandler}