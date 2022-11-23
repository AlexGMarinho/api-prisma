import express, { NextFunction, Request, Response } from "express";
import { errors } from "celebrate";
import { router } from "./routers/routes";
import { AppError } from "../errors/AppError";

const app = express();

app.use(express.json());
app.use(router);

app.use(errors());

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.listen(3030, () => console.log("Server is running PORT 3030"));
