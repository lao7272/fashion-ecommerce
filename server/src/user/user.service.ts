import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from '../utils/bcrypt';


@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User> 
  ) {}
  async create(createUserDto: CreateUserDto):Promise<User> {
    const user: User = new User();
    const date: number = Date.now();
    const hashedPassword: string = await hash(createUserDto.password)
    user.name = createUserDto.name;
    user.lastname = createUserDto.lastname;
    user.password = hashedPassword;
    user.email = createUserDto.email;
    user.createdOn = date;
    user.updatedOn = date;
    return this.userRepository.save(user);
  }
  findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({email});
  }

}
