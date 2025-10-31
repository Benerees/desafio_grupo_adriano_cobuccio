import { AllExceptionsFilter } from './exception.filter';
import { ArgumentsHost, HttpException } from '@nestjs/common';

describe('AllExceptionsFilter', () => {
    let filter: AllExceptionsFilter;
    let mockHost: Partial<ArgumentsHost>;
    let mockResponse: any;

    beforeEach(() => {
        filter = new AllExceptionsFilter();
        mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockHost = {
            switchToHttp: jest
                .fn()
                .mockReturnValue({
                    getResponse: () => mockResponse,
                    getRequest: () => ({ url: '/test' }),
                }),
        };
    });

    it('should be defined', () => {
        expect(filter).toBeDefined();
    });

    it('should handle HttpException', () => {
        const exception = new HttpException('Bad Request', 400);
        filter.catch(exception, mockHost as ArgumentsHost);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should handle HttpException', () => {
        const exception: any = {};
        filter.catch(exception, mockHost as ArgumentsHost);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalled();
    });
});
