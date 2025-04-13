import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('by-role')
    getUsersByRole(@Query('role') role: string) {
        // Logic to fetch users by role will go here
        return `Fetching users with role: ${role}`;
    }
}
