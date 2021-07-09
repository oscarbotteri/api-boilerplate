import { Service } from 'typedi';
import { InjectConnection } from 'typeorm-typedi-extensions';
import { Connection } from 'typeorm';
import { UserDto } from '../users/dtos';
import { UserEntity } from '../users/user.entity';
import { plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as config from 'config';
import { Repository } from 'typeorm/repository/Repository';
import { UserService } from '../users/user.service';

@Service()
export class AuthService {
  private repository: Repository<UserEntity>;

  constructor(@InjectConnection() private readonly connection: Connection, private readonly userService: UserService) {
    this.repository = this.connection.getRepository(UserEntity);
  }

  async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    const userDto = plainToClass(UserDto, user);
    const isValid = await bcrypt.compare(password, user.password);

    return isValid ? userDto : undefined;
  }

  async login(user: UserDto): Promise<string> {
    return jwt.sign({ ...plainToClass(UserDto, user) }, config.AUTH_SECRET);
  }
}
