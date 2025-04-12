import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AvailabilityController } from './availability/availability.controller';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false }: false,
    }),
    AuthModule,
    UsersModule,
    AppointmentsModule,
    NotificationsModule,
    AvailabilityModule,
  ],
  controllers: [AppController, AvailabilityController],
  providers: [AppService],
})
export class AppModule {}
