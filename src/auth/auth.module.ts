import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginUserDto } from './dto/login-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { JwtModule } from "@nestjs/jwt";
import { EXPIRES_IN, JWT_KEY } from "src/auth/constants/jwt.constants"

@Module({
  imports: [TypeOrmModule.forFeature([User, Employee, Manager]),
  JwtModule.register({
    secret: JWT_KEY,
    signOptions: {
      expiresIn: EXPIRES_IN,
    },
    global: true,
  })
],
  controllers: [AuthController],
  providers: [AuthService],


})
export class AuthModule {}
