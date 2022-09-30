import { isAuthenticated } from './../../middlewares';
import { createPostByUserId, getPostByUserId } from './posts.services';
import express from 'express';

const router = express.Router();

router.get('/', isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    const posts = await getPostByUserId(userId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    const { title, content } = req.body;
    await createPostByUserId({ title, content, userId });
    res.json({ message: 'Post successfully created!' });
  } catch (err) {
    next(err);
  }
});

export default router;
