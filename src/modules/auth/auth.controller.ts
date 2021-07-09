import { Body, JsonController, Post, BadRequestError, UnauthorizedError } from 'routing-controllers';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto } from './dtos';
import { UserService } from '../users/user.service';

@JsonController('/auth')
export class StatusController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('/signin')
  async login(@Body() payload: LoginRequestDto): Promise<any> {
    const user = await this.authService.validate(
      payload.email,
      payload.password,
    );

    if (!user) {
      throw new UnauthorizedError();
    }

    const token: string = await this.authService.login(user);

    return {
      token,
    };

  }

  @Post('/signup')
  async register(@Body() payload: RegisterRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(payload.email);

    if (user) {
      throw new BadRequestError('email already in use');
    }

    const newUser = await this.userService.create(payload);
    const token = await this.authService.login(newUser);

    return {
      token,
    };
  }
}
