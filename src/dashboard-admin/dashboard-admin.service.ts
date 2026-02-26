import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DashboardAdminService {
  prisma = new PrismaClient();

  // ----- LẤY THÔNG TIN LINK BI ----- //
  async getAllDashboardAdmin() {
    const content = await this.prisma.powerBi.findMany();
    return { message: 'Thành công', content, date: new Date() };
  }

  // ----- TẠO LINK BI ----- //
  async createDashboardLink(body: any) {
    const checkLink = await this.prisma.powerBi.findFirst({
      where: {
        link: body.link,
      },
    });

    if (checkLink) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Link này đã tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.prisma.powerBi.create({
      data: {
        title: body.title,
        link: body.link,
        userId: body.userId,
        status: true,
        createDate: new Date(),
      },
    });
    return { message: ' Thành công', data, date: new Date() };
  }

  // ----- EDIT LINK BI ----- //
  async editDashboardLink(body: any) {
    const checkEdit = await this.prisma.powerBi.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!checkEdit) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Link này không tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.prisma.powerBi.update({
      where: {
        id: checkEdit.id,
      },
      data: {
        title: body.title,
        link: body.link,
        modifiedDate: new Date(),
      },
    });
    return { message: 'Thành công', data, date: new Date() };
  }
}
