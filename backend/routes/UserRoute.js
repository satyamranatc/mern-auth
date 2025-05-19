import { Router } from "express";

import {login, SignUp} from "../controller/UserController.js"

const router = Router();

router.post("/login", login);
router.post("/SignUp", SignUp);

export default router;
