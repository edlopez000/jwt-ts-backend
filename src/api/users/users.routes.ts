import bcrypt from 'bcrypt';
import express from 'express';
import { isAuthenticated } from '../../middlewares';
import { changePasswordByUserId, findUserById } from './users.services';

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

router.post('/changepassword', isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    const { password, newPassword } = req.body;
    const existingUser = await findUserById(userId);

    if (!existingUser) {
      res.status(404).send({ message: 'User does not exist.' });
      throw new Error('User does not exist.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(403).send({ message: 'Invalid credentials.' });
      throw new Error('Invalid credentials.');
    }

    await changePasswordByUserId(existingUser, newPassword);

    // TODO: Need to revoke refreshToken after password change
    res.status(200).json({ message: 'Password reset success!' });
  } catch (err) {
    next(err);
  }
});

export default router;
