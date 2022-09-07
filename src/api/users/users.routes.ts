import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { findUserById } from './users.services';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from the Users API endpoint' });
});

router.get('/profile', isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    const user: any = await findUserById(userId);
    delete user?.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
