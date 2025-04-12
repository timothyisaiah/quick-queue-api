// src/notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async notify(user: any, message: string) {
    const notification = this.notificationRepo.create({
      user,
      message,
      read: false, // By default, notifications are unread
    });

    await this.notificationRepo.save(notification);
  }

  async getUserNotifications(userId: number) {
    return this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationRepo.findOne({
      where: { id: notificationId },
    });
    
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    
    notification.read = true;
    return this.notificationRepo.save(notification);
  }  
    
}
