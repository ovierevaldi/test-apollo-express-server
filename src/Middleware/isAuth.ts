import express, { NextFunction, Request, Response } from "express";
import jwtProvider from "../Providers/jwt";

const router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
    const authValue = req.headers.authorization;

    // Check if it's a valid token
    if(authValue){
        req.user = await jwtProvider().verifyUser(authValue);
    };
    next();
})

export default router;