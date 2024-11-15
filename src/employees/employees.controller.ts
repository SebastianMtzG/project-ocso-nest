import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorators';
import { AwsService } from 'src/aws/aws.service';


@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService, 
    private readonly awsService: AwsService,
  ) {}

  @Auth(ROLES.MANAGER)

@ApiResponse({
  example: {
    status: 201,
    employeeId: "UUID",
    employeeName: "Sebas",
    employeeEmail: "sebas@gmail",
    employeeLastname: "Martinez",
    employeePhonenumber:"444543333"
  } as Employee
})


  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)

  @Post(":id/upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadPhoto(@Param('id') id:string,  @UploadedFile() file: Express.Multer.File){
     const response = await this.awsService.uploadFile(file)
      return this.employeesService.update(id, {
        employeePhoto: response
      });
    
  }

  @Auth(ROLES.MANAGER)

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)

  @Get(':id')
  findOne( 
    @Param('id', new ParseUUIDPipe({version : '4'}))
    id: string){
    return this.employeesService.findOne(id);
    }

    @Auth(ROLES.MANAGER)
    @Get('/location/:id')
    findAllLocation(@Param('id') id: string){
      return this.employeesService.findByLocation(+id);
    }

    @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)

  

  @Patch(':id')
  update ( @Param('id', new ParseUUIDPipe({version : '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)

  @Delete('/:id')
  remove(
  @Param('id', new ParseUUIDPipe({version : '4'}))
   id: string
  )

    {
    return this.employeesService.remove(id);
  }
}
