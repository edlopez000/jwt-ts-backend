// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT
// Ignored the warning above and modified as needed
// Next time I run the generator, I'll need to look at the diff of the files

export interface User {
  id?: string;
  email: string;
  password: string;
  refreshTokens?: RefreshToken[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshToken {
  id: string;
  hashedToken: string;
  userId: string;
  User: User;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  title: string;
  author?: User;
  authorId?: string;
  content: string;
}
