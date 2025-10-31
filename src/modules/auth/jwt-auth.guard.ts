import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException('Missing token');
        const parts = authHeader.split(' ');
        if (parts.length !== 2)
            throw new UnauthorizedException('Malformed token');
        const token = parts[1];
        try {
            const payload = this.jwtService.verify(token);
            req.user = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
