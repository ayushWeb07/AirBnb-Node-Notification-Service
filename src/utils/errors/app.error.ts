export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = 500;
    this.message = message;
    this.name = "InternalServerError";
    this.stack = stack;
  }
}

export class BadRequestError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = 400;
    this.message = message;
    this.name = "BadRequestError";
    this.stack = stack;
  }
}

export class UnauthorizedError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = 401;
    this.message = message;
    this.name = "UnauthorizedError";
    this.stack = stack;
  }
}

export class ForbiddenError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = 403;
    this.message = message;
    this.name = "ForbiddenError";
    this.stack = stack;
  }
}

export class NotFoundError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = 404;
    this.message = message;
    this.name = "NotFoundError";
    this.stack = stack;
  }
}
