import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DashboardAdminService } from './dashboard-admin.service';
import { CreateDashboardAdminDto } from './dto/create-dashboard-admin.dto';
import { UpdateDashboardAdminDto } from './dto/update-dashboard-admin.dto';

@Controller('api/dashboardAdmin')
export class DashboardAdminController {
  constructor(private readonly dashboardAdminService: DashboardAdminService) {}

  // ----- LẤY THÔNG TIN LINK BI ----- //
  @Get('getAllDashboardAdmin')
  getAllDashboardAdmin() {
    return this.dashboardAdminService.getAllDashboardAdmin();
  }

  // ----- TẠO LINK BI ----- //
  @Post('createDashboardLink')
  createDashboardLink(@Body() body: any) {
    return this.dashboardAdminService.createDashboardLink(body);
  }

  // ----- EDIT LINK BI ----- //
  @Post('editDashboardLink')
  editDashboardLink(@Body() body: any) {
    return this.dashboardAdminService.editDashboardLink(body);
  }
}
