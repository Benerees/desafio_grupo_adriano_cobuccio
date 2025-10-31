import { Module } from '@nestjs/common';
import { SequelizeModule } from '../../common/sequelize/sequelize.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [SequelizeModule, AuthModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
