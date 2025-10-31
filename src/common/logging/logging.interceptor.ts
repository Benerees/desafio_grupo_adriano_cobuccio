import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const now = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl || req.url;
        this.logger.log(`[${now}] ${method} ${url}`);
        return next.handle();
    }
}
