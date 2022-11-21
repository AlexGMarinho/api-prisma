import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { router } from "./routers/routes";

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.log("the error: ", err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3030, () => console.log("Server is running PORT 3030"));
