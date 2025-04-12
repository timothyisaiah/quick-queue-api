import { Controller, Get, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getMyNotifications(@Request() req) {
    return this.notificationsService.getUserNotifications(req.user.userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }
}
