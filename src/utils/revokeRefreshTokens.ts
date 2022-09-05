import { revokeTokens } from './../api/auth/auth.services';
import express from 'express';

const router = express.Router();

// TEMP - example of how to use the the revokeTokens() function
// revokeTokens shouldn't be used made available through the API

router.post('/revokeRefreshTokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});
