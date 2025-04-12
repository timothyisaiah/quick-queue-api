import {
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Body,
    UseGuards,
    Request,
    ForbiddenException,
  } from '@nestjs/common';
  import { AppointmentsService } from './appointments.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('appointments')
  @UseGuards(JwtAuthGuard)
  export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}
  
    @Post('request')
    request(@Body() body: any, @Request() req: any) {
      return this.appointmentsService.requestAppointment(body, req.user);
    }
  
    @Get()
    getAppointments(@Request() req: any) {
      return this.appointmentsService.getAppointments(req.user);
    }
  
    @Patch(':id/:action')
    updateStatus(@Param('id') id: number, @Param('action') action: string, @Request() req: any) {
      if (req.user.role !== 'provider') {
        throw new ForbiddenException('Only providers can update status');
      }
      return this.appointmentsService.updateStatus(id, action, req.user.id);
    }
  }
  