import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  // ----- LẤY THÔNG TIN USER ----- //
  async getAllUser() {
    const content = await this.prisma.users.findMany();
    return { message: 'Thành công', content, date: new Date() };
  }

  // ----- TẠO USER ----- //
  async createUser(body: any) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        AND: [{ userName: body.userName }, { email: body.email }],
      },
    });

    if (checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản này đã tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.prisma.users.create({
      data: {
        userName: body.userName,
        pass: bcrypt.hashSync(body.pass, 10),
        email: body.email,
        brithday: body.brithday || null,
        phone: body.phone,
        fullName: body.fullName,
        createDate: new Date(),
        status: true,
        address: body.address,
        boPhan: {
          connect: { id: Number(body.boPhan) },
        },
        vaiTro: {
          connect: { id: Number(body.vaiTro) },
        },
      },
    });

    return { message: 'Thành công', data, date: new Date() };
  }

  // ----- EDIT USER ----- //
  async editUser(body: any) {
    const checkEditUser = await this.prisma.users.findFirst({
      where: {
        userId: body.userId,
      },
    });

    if (!checkEditUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Tên đăng nhập này không tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateData: any = {
      userId: body.userId,
      fullName: body.fullName,
      userName: body.userName,
      email: body.email,
      brithday: body.brithday || null,
      phone: body.phone,
      status: Boolean(body.status),
      vaiTro: body.vaiTro,
      address: body.address,
      modifiedDate: new Date(),
    };

    if (body.pass) {
      updateData.pass = bcrypt.hashSync(body.pass, 10);
    }

    const data = await this.prisma.users.update({
      where: {
        userId: checkEditUser.userId,
      },
      data: updateData,
    });
    return { message: 'Thành công', data, date: new Date() };
  }

  // ----- ĐỔI MẬT KHẨU ----- //
  async changePass(body: any) {
    const checkUser = await this.prisma.users.findFirst({
      where: { userId: body.userId },
    });

    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User này không tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const passWord = bcrypt.hashSync(body.pass, 10);

    const data = await this.prisma.users.update({
      where: {
        userId: body.userId,
      },
      data: {
        pass: passWord,
        modifiedDate: new Date(),
      },
    });

    return { message: 'Thành công', data, date: new Date() };
  }

  // ----- TẠM NGƯNG USER ----- //
  async delUser(id: number) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        userId: Number(id),
      },
    });

    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User này không tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.prisma.users.update({
      where: {
        userId: Number(id),
      },
      data: {
        status: false,
        modifiedDate: new Date(),
      },
    });
    return { message: 'Thành công', data, date: new Date() };
  }
}
