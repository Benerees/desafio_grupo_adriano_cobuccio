import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}
    private readonly logger = new Logger('HTTP');
    private readonly isDevelopment = process.env.NODE_ENV === 'dev';

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const traceId = randomUUID();
        req.traceId = traceId;

        const startTime = Date.now();
        const method = req.method;
        const url = req.originalUrl || req.url;

        let userId = 'no id';
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const parts = authHeader.split(' ');
            if (parts.length == 2) {
                const token = parts[1];
                const payload = this.jwtService.verify(token);
                userId = payload.sub;
            }
        }

        const logData: any = {
            type: 'REQUEST',
            traceId,
            method,
            url,
            userId,
        };

        if (this.isDevelopment) {
            logData.timestamp = new Date().toISOString();
            if (Object.keys(req.query).length > 0) {
                logData.query = req.query;
            }
            if (Object.keys(req.params).length > 0) {
                logData.params = req.params;
            }
            if (['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
                logData.body = req.body;
            }
        }

        this.logger.log(logData);

        return next.handle().pipe(
            tap({
                next: (data) => {
                    const duration = Date.now() - startTime;
                    const logData: any = {
                        type: 'RESPONSE',
                        traceId,
                        method,
                        url,
                        duration: `${duration}ms`,
                        statusCode: res.statusCode,
                    };

                    if (this.isDevelopment) {
                        logData.timestamp = new Date().toISOString();
                        logData.userId = req.user?.id;
                    }

                    this.logger.log(logData);
                },
            }),
        );
    }
}
