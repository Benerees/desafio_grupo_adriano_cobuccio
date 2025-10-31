import { Module } from '@nestjs/common';
import { SequelizeModule } from '../../common/sequelize/sequelize.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserRepository } from '../../common/repositories/user.repository';
import { TransactionRepository } from '../../common/repositories/transaction.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [SequelizeModule, AuthModule],
    controllers: [TransactionController],
    providers: [TransactionService, UserRepository, TransactionRepository],
})
export class TransactionModule {}
