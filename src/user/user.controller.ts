import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ----- LẤY THÔNG TIN USER ----- //
  @Get('getAllUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  // ----- TẠO USER ----- //
  @Post('createUser')
  createUser(@Body() body: any) {
    return this.userService.createUser(body);
  }

  // ----- EDIT USER ----- //
  @Post('editUser')
  editUser(@Body() body: any) {
    return this.userService.editUser(body);
  }

  // ----- DEL USER ----- //
  @Delete('delUser')
  delUser(@Query('id') id: number) {
    return this.userService.delUser(id);
  }
}
