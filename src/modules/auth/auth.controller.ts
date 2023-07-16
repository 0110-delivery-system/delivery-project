import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign up' })
    @Post('signup')
    async signUp(@Body() body: CreateAuthDto) {
        await this.authService.signUp(body);
        return { message: 'Sign up successful' };
    }

    @Post('login')
    async login(@Body() body: CreateAuthDto) {
        const tokens = await this.authService.login(body);
        return tokens;
    }
}
