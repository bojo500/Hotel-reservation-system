import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ApiProperty({ enum: ['Admin', 'User', 'guest']})
  roles: Role[];


}
