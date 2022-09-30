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
