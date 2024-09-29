import { IsString, MaxLength, IsEmail, IsNumber } from "class-validator";
import { Manager } from "../entities/manager.entity";


export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    managerFullNmae: string;
    @IsString()
    @IsEmail()
    managerEmail:string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
}
