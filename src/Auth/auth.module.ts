import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CONSTANTS } from 'src/CONSTANTS';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strtegy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: CONSTANTS.secretKey,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
