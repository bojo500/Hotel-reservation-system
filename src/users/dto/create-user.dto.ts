import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum";


export class CreateUserDto {
  @ApiProperty({
    description: 'The name of a user',
    type: String,
    default: 'Mohamed Khaled',
  })
  @IsNotEmpty()
  @IsString()
   username: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['Admin', 'User']})
  roles: Role[];
}
