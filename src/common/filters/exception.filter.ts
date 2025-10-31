import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger('ExceptionFilter');

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const traceId = randomUUID();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error({
            traceId,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
            status,
            error: exception.name,
            message:
                exception.response?.message ||
                exception.message ||
                'No message',
            user: request.user?.id || 'anonymous',
            body: request.body,
            query: request.query,
            params: request.params,
            stack: exception.stack,
        });

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.response?.message || 'No message',
            path: request.url,
            traceId,
        });
    }
}
