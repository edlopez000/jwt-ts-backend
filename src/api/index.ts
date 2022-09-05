import express from 'express';
import auth from './auth/auth.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from the API endpoint',
  });
});

router.use('/auth', auth);

export default router;
