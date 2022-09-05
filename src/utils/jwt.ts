import { User } from './../../prisma/generated/models/User.model';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
    expiresIn: '5m',
  });
};

export const generateRefreshToken = (user: User, jti) => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    `${process.env.JWT_REFRESH_SECRET}`,
    {
      expiresIn: '8h',
    }
  );
};

export const generateTokens = (user: User, jti) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};
