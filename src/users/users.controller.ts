import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, UseInterceptors, UploadedFile, UploadedFiles
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { Role, Roles } from "./enum";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "../common/file.util";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({ destination: "./upload", filename: editFileName }),
      fileFilter: imageFileFilter
    })
  )
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const modified = file
      ? Object.assign(createUserDto, { image: `upload/${file.filename}` })
      : createUserDto;
    return this.usersService.create(modified);
  }

  @Post("images")
  @UseInterceptors(
    FilesInterceptor("images", 3, {
      storage: diskStorage({ destination: "./upload", filename: editFileName }),
      fileFilter: imageFileFilter
    })
  )
  upload(
    @UploadedFiles() images?: Array<Express.Multer.File>
  ) {
    const _images = images?.map(image => ({ image: `upload/${image.filename}` }))
  }

  // async updateUserImages(
  //   @Param('id') id: string,
  // ) {
  //   const user = await this.usersService.findOne(id);
  //   return this.usersService.update(user.id, { images: _images });
  // }


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

