import { IsEmail, IsObject, IsString, MaxLength, IsOptional } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateEmployeeDto extends Employee {
    @ApiProperty()
    @IsString()
@MaxLength(30)
employeeName: string;

@ApiProperty()
@IsString()
@MaxLength(30)
employeeLastname: string;

@ApiProperty()
@IsString()
@MaxLength(10)
employeePhonenumber: string;

@ApiProperty()
@IsString()
@IsEmail()
employeeEmail:string;

@ApiPropertyOptional()
@IsOptional()
@IsString()
location: Location;

@ApiPropertyOptional()
@IsOptional()
employeePhoto: string
}

