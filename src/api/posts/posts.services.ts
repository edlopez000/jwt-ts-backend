import { db } from '../../utils/db';

export const createPostByUserId = ({
  title,
  content,
  userId,
  published,
}: {
  title: string;
  content: string;
  userId: string;
  published?: boolean;
}) => {
  return db.post.create({
    data: {
      title: title,
      content: content,
      authorId: userId,
      published: published,
    },
  });
};

export const getPostByUserId = ({ userId }: { userId: string }) => {
  return db.post.findMany({
    where: {
      authorId: userId,
    },
  });
};

export const getPostByPostId = ({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) => {
  return db.post.findMany({
    where: {
      id: postId,
      authorId: userId,
    },
  });
};

export const deletePostByPostId = ({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) => {
  return db.post.deleteMany({
    where: {
      id: Number(postId),
      authorId: userId,
    },
  });
};

export const updatePostByPostId = ({
  userId,
  postId,
  title,
  content,
  published,
}: {
  userId: string;
  postId: number;
  title?: string;
  content?: string;
  published?: boolean;
}) => {
  return db.post.updateMany({
    where: {
      id: Number(postId),
      authorId: userId,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
};
