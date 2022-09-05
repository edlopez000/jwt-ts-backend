import { IsString, IsDefined, IsDate } from 'class-validator';
import { RefreshToken } from './';

export class User {
  @IsDefined()
  @IsString()
  id!: string;

  @IsDefined()
  @IsString()
  email!: string;

  @IsDefined()
  @IsString()
  password!: string;

  @IsDefined()
  refreshTokens!: RefreshToken[];

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsDefined()
  @IsDate()
  updatedAt!: Date;
}
