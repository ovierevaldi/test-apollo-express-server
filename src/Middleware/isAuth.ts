import express, { NextFunction, Request, Response } from "express";
import jwtProvider from "../Providers/jwt";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    const authValue = req.headers.authorization;

    // Check if it's a valid token
    if(authValue){
        jwtProvider().verify(authValue, (err, decoded) => {
            if(!decoded)
                req.user = null;

            req.user = decoded;
        });
    };
    next();
})

export default router;