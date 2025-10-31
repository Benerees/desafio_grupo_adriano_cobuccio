import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
    it('transfers between users when balance sufficient', async () => {
        const sender: any = {
            id: 's',
            balance: '100.00',
            update: jest.fn().mockResolvedValue(true),
        };
        const receiver: any = {
            id: 'r',
            balance: '0.00',
            update: jest.fn().mockResolvedValue(true),
        };
        const userRepo: any = {
            findById: jest
                .fn()
                .mockImplementation((id) =>
                    id === 's'
                        ? Promise.resolve(sender)
                        : Promise.resolve(receiver),
                ),
        };
        const transactionRepository: any = {
            create: jest.fn().mockResolvedValue({ id: 'tx1' }),
            getSequelizeInstance: () => ({ transaction: (cb: any) => cb({}) }),
        };
        const svc = new TransactionService(userRepo, transactionRepository);
        const transaction = await svc.transfer('s', 'r', '10.00');
        expect(transactionRepository.create).toHaveBeenCalled();
        expect(sender.update).toHaveBeenCalled();
        expect(receiver.update).toHaveBeenCalled();
    });
});
