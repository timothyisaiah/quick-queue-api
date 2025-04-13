import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: { name: string; email: string; password: string; role?: string },
  ) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  getSession(@Req() req) {
    return {
      user: req.user,
    };
  }
}
