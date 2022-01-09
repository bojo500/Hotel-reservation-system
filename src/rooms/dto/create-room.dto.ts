import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateRoomDto {

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  roomNub: string;
}
