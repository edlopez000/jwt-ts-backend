import express from 'express';
import auth from './auth/auth.routes';
import users from './users/users.routes';
import posts from './posts/posts.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from the API endpoint',
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);

export default router;
