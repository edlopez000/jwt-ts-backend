import { IsString, IsDefined, IsBoolean, IsDate } from 'class-validator';
import { User } from './';

export class RefreshToken {
  @IsDefined()
  @IsString()
  id!: string;

  @IsDefined()
  @IsString()
  hashedToken!: string;

  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  User!: User;

  @IsDefined()
  @IsBoolean()
  revoked!: boolean;

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsDefined()
  @IsDate()
  updatedAt!: Date;
}
