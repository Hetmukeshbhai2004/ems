import expreess from 'express';
import { login } from '../controller/authController';

const router = expreess.Router();

router.post('/login',login )