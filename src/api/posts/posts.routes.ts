import { isAuthenticated } from './../../middlewares';
import {
  createPostByUserId,
  deletePostByPostId,
  getPostByUserId,
  getPostByPostId,
  updatePostByPostId,
} from './posts.services';
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
    const post = await createPostByUserId({ title, content, userId });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/:postId', isAuthenticated, async (req: any, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.payload;
    const post = await getPostByPostId({ userId, postId });
    res.json({ post });
  } catch (err) {
    next(err);
  }
});

router.delete('/:postId', isAuthenticated, async (req: any, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.payload;
    await deletePostByPostId({ userId, postId });
    res.json({ message: `Post #${postId} was sucessfully deleted!` });
  } catch (err) {
    next(err);
  }
});

router.put('/:postId', isAuthenticated, async (req: any, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.payload;
    const { title, content, published } = req.body;
    await updatePostByPostId({
      userId,
      postId,
      title,
      content,
      published,
    });

    res.json({ message: `Post #${postId} was sucessfully changed!` });
  } catch (err) {
    next(err);
  }
});

export default router;
