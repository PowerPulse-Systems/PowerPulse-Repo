import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpDto: { name: string; email: string; password: string }) {
    return this.authService.signup(signUpDto.name, signUpDto.email, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: Record<string, string>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }
}
