import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if(user){
        var comparePassword = await user?.validatePassword(pass)
        console.log(comparePassword)
    }
    if (comparePassword !== true) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload,{expiresIn:"2h"}),
      user
    };
  }
}