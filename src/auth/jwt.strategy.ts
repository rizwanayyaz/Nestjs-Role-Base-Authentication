import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'add-secret-key-from-env',
    });
  }

  async validate(payload:{userId: number}): Promise<any> {
    if(payload.userId){
      const user = await Users.findOne({where:{id: payload.userId}});
      if (!user) {
        throw new UnauthorizedException();
      }
    }
    
    return {userId: payload.userId};
  }
}