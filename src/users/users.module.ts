import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./enum/roles.guard";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService ,   {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  exports: [UsersService],
})
export class UsersModule {}
