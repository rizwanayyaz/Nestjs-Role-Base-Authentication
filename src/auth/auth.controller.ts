import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}