import { userDetails ,fillJug,countFillJugName,ALLdata} from "../controller/user.controller.js";
import { Router } from "express";

const router = Router();

router.post('/details',userDetails);
router.post('/filljug',fillJug);
router.post('/alldata',ALLdata);
router.post('/count',countFillJugName);

export default router;