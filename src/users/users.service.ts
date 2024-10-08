import { Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UsersDto[] = [];

  create(newUser: UsersDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
    return newUser;
  }
}
