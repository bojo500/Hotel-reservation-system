import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, UseInterceptors, HttpStatus
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { Role, Roles } from "./enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Helper } from "../shared/helper";
import { identity } from "rxjs";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("file-upload")
  @UseInterceptors(
    FileInterceptor("picture", {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName
      })
    })
  )
  uploadfile(id: string, updateUserDto: UpdateUserDto.picture) {
      return this.usersService.save( id, updateUserDto);
  }



  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(204)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(204)
  @Roles(Role.Admin)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}

