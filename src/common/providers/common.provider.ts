import { UserRepository } from '../repositories/user.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

export const commonProviders = [UserRepository, TransactionRepository];
