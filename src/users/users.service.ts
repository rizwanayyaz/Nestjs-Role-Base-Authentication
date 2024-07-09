import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

 async create(createUserDto: CreateUserDto) {
    const user = Users.create({...createUserDto});
    await user.save();
    return user;
 }
 

  async findOne(email: string) {
    let emailValue = Object.values(email)
     let user = await Users.findOne({
        where: { 'email': emailValue[0] },
    })
    return user
  }
}