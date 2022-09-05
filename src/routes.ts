import express from 'express';
import api from './api';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Howdy! The API is up and running!',
  });
});

router.use('/api/v1', api);

export default router;
