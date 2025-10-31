import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '../../common/sequelize/sequelize.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [SequelizeModule, AuthModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
