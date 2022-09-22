import bcrypt from 'bcrypt';
import { db } from '../../utils/db';
import { User } from '../../../prisma/generated/interfaces/index';

export const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createUserByEmailAndPassword = (user: User) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
};

export const findUserById = (id: string) => {
  return db.user.findFirst({
    where: { id },
  });
};

export const changePasswordByUserId = (user: User, newPassword: string) => {
  newPassword = bcrypt.hashSync(newPassword, 12);
  return db.user.update({
    where: { id: user.id },
    data: { password: newPassword },
  });
};
