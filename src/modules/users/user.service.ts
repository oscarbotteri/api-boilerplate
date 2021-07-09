import { Service } from 'typedi';
import { InjectConnection } from 'typeorm-typedi-extensions';
import { Connection, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import * as config from 'config';
import { UserDto } from './dtos';
import { UserEntity } from './user.entity';

@Service()
export class UserService {
  private repository: Repository<UserEntity>;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.repository = this.connection.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async create(payload: Omit<UserDto, 'id'>): Promise<UserDto> {
    const password = await bcrypt.hash(payload.password, config.AUTH_SALT_ROUNDS);
    const user = await this.repository.save({
      ...payload,
      password,
    });

    return plainToClass(UserDto, user);
  }
}
