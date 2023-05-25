import express from 'express';

const userRouter =express.Router();

userRouter.post("/api/users",(req,res)=>
{
    res.sendStatus(200);
});

export default userRouter;