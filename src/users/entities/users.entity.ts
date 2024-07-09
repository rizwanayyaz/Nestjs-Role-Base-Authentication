import {BaseEntity, BeforeInsert, Column,Entity,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({name:'users'})
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:'fullname', type: 'varchar', length: 255 })
    fullname:string;
    
    @Column({name:'email', type: 'varchar', length: 255})
    email:string;

    @Column({name:'password', type: 'varchar', length: 255})
    password:string;

    @BeforeInsert()
    async hashPassword(){
        //Hashing password before saving it
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(password:string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }    
}