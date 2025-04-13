import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Patch,
    ParseIntPipe,
    Delete,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { UsersService } from 'src/users/users.service';

@Controller('availability')
@UseGuards(JwtAuthGuard)
export class AvailabilityController {
    constructor(
        private readonly availabilityService: AvailabilityService,
        private readonly usersService: UsersService,
    ) { }

    // Get all availability slots for the logged-in provider
    @Get()
    findAll(@Request() req: any) {
        return this.availabilityService.findAllForProvider(req.user.userId);
    }

    @Post()
    async create(@Body() dto: CreateAvailabilityDto, @Request() req: any) {
        const provider = await this.usersService.findOne(req.user.userId);
        if (!provider) {
            throw new NotFoundException('Provider not found');
        }
        return this.availabilityService.createAvailability(dto, req.user.userId, provider);
    }


    // Update availability
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAvailabilityDto,
        @Request() req: any,
    ) {
        return this.availabilityService.updateAvailability(id, dto, req.user.userId);
    }

    // Delete availability
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        return this.availabilityService.removeAvailability(id,  req.user.id);
    }

    // Get availability for a specific provider (for clients)
    @Get('provider/:providerId')
    findForProvider(@Param('providerId') providerId: number) {
        return this.availabilityService.findAllForProvider(providerId);
    }

}
