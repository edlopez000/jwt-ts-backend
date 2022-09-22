import {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
} from './../users/users.services';
import express from 'express';
import { v4 as uuid } from 'uuid';
import { generateTokens } from '../../utils/jwt';
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
} from './auth.services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hashToken from '../../utils/hashToken';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send({ message: 'You must provide an email and password' });
      throw new Error('You must provide an email and password.');
    }
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).send({ message: 'Email Already in use' });
      throw new Error('Email already in use.');
    }

    const user = await createUserByEmailAndPassword({ email, password });
    const jti = uuid();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send({ message: 'You must provide an email and password' });
      throw new Error('You must provide an email and password');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403).send({ message: 'Invalid login credentials' });
      throw new Error('Invalid login credentials');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403).send({ message: 'Invalid login credentials.' });
      throw new Error('Invalid login credentials.');
    }

    const jti = uuid();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).send({ message: 'Missing refresh token.' });
      throw new Error('Missing refresh token.');
    }

    // TEMP any type, until I do some type narrowing
    const payload: any = jwt.verify(
      refreshToken,
      `${process.env.JWT_REFRESH_SECRET}`
    );

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(400).send({ message: 'Unauthorized' });
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401).send({ message: 'Unauthorized' });
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);

    if (!user) {
      res.status(401).send('Unauthorized');
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuid();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

export default router;
