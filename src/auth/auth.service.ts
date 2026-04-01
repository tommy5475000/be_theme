import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createToken } from '../config/jwt.js';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  async login(body: any) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        userName: body.userName,
      },
    });

    if (!checkUser) {
      throw new UnauthorizedException('Tên đăng nhập không đúng'); // ✅
    }

    const checkPass = bcrypt.compareSync(body.password, checkUser.pass);

    if (!checkPass) {
      throw new UnauthorizedException('Mật khẩu không đúng'); // ✅
    }

    const token = createToken({
      userId: checkUser.userId,
      vaiTroId: checkUser.vaiTroId,
    });

    return { message: 'Đăng nhập thành công', token, date: new Date() };
  }
}
