import { Injectable, ConflictException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
async create(createUserDto: CreateUserDto) {
      const findUser: User = await this.userRepository.findOneBy({email: createUserDto.email});
        if(findUser) throw new ConflictException();
        const user: User = new User();
        const date: number = Date.now();
        const hashedPassword: string = await hash(createUserDto.password)
        user.name = createUserDto.name;
        user.lastname = createUserDto.lastname;
        user.age = createUserDto.age;
        user.password = hashedPassword;
        user.email = createUserDto.email;
        user.createdOn = date;
        user.updatedOn = date;
    return this.userRepository.save(user);
  }

  findOne(email: string) {
    return this.userRepository.findOneBy({email});
  }
}
