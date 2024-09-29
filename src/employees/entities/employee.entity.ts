import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
 @PrimaryGeneratedColumn("uuid")
employeeId: string;
@Column({type: "text"})
name: string;
@Column({type: "text"})
lastname: string;
@Column({type:"text"})
phonenumber: string;
@Column({type:"text"})
email: string;
@Column({
    type :"text",
    nullable: true
})
photoUrl: string
}
