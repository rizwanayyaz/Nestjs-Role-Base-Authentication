import { Body, Controller, Post, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Users } from './entities/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':email')
  async findOne(@Param() email: string): Promise<Users>{
    console.log(email)
    return await this.usersService.findOne(email)
  }

}