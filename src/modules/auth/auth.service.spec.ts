import { AuthService } from './auth.service';

describe('AuthService', () => {
    it('registers a new user', async () => {
        const userRepo: any = {
            findByEmail: jest.fn().mockResolvedValue(null),
            create: jest
                .fn()
                .mockResolvedValue({ id: '1', name: 'n', email: 'e' }),
        };
        const jwt: any = { sign: jest.fn().mockReturnValue('token') };
        const svc = new AuthService(userRepo, jwt as any);
        const user = await svc.register('n', 'e@test.com', 'pass');
        expect(userRepo.findByEmail).toHaveBeenCalled();
        expect(userRepo.create).toHaveBeenCalled();
    });
});
