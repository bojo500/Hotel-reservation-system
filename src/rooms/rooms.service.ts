import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "./entities";
import { CreateRoomDto, UpdateRoomDto } from "./dto";

@Injectable()
export class RoomsService {

  constructor(@InjectRepository(Room) private repository: Repository<Room>) {
  }

  async create(createRoomDto: CreateRoomDto) {
    try {
      await this.repository.save(createRoomDto);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: "Created Successfully",
      statusCode: HttpStatus.CREATED
    };
  }


  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      await this.repository.save({ ...updateRoomDto});
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: "Updated Successfully",
      statusCode: HttpStatus.OK
    };
  }

  async remove(id: number) {
    let item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    try {
      await this.repository.delete(item.id);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: "Deleted Successfully",
      statusCode: HttpStatus.OK
    };
  }
}
