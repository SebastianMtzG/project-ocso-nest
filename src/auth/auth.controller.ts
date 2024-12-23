import { Controller, Query, Post, Body, Patch, Param, Delete, Put, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorators';

@ApiTags('Auth')


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/employee/[id]")

  @Post("register/:id")

  registerManager(
    @Query("role") role: string,
    @Body() createUserDto: CreateUserDto, @Param("id") id:string ){
    if (role === "manager"){
      return this.authService.registerManager(id, createUserDto)
    }else if (role === "employee") {
      return this.authService.registerEmployee(id, createUserDto)
    }

  throw new BadRequestException("Rol invalido")
  }

  @Post("login")
  async login(@Body() loginUserDto :LoginUserDto, @Res({passthrough:true}) response : Response, @Cookies() cookies: any){
    const token = await this.authService.loginUser(loginUserDto)
    response.cookie(TOKEN_NAME, token,{
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return  token;
    }

  @Patch("/:id")
  updateUser(@Param('id') userEmail: string, @Body() UpdateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail, UpdateUserDto)
  }
}
