import { Controller, Post, UseGuards, Request, Get, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../users/entities/user.entity";
import { RegisterDto } from "../users/dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * the login
   * @param req
   * @param body
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(@Request() req, @Body() body): Promise<User> {
    return this.authService.login(req.user);
  }

  /**
   * the login
   * @param userData
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() userData: RegisterDto): Promise<User> {
    return this.authService.register(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}