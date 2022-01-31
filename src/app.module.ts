import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { RoomsModule } from './rooms/rooms.module';
import { MediaModule } from './module/media/media.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    RoomsModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
