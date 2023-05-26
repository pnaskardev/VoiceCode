import express from 'express';
import userRouter from './user_routes';
import authRouter from './auth_routes';


const router=express.Router();

router.get('/healthCheck',(_,res)=>
{
    res.sendStatus(200);
});


router.use(userRouter);
router.use(authRouter);

export default router;