import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../config/configuration';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  create(createUserDto: CreateUserDto) {
    const makeSomething = () => {
      return 'a ';
    };

    const a = makeSomething();

    return 'This action adds a new user';
  }

  findAll() {
    const a = this.configService.get('database');
    // a.port, a.host
    // const c = a.b.c; //  property c 못찾겠다.
    // console.log(c);

    // this.count++;
    // console.log(`UserService.findAll() called ${this.count} times.`);
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
