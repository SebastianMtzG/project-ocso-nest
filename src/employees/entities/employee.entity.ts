import { IsEmail, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn , OneToOne} from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Employee {
 @PrimaryGeneratedColumn("uuid")
employeeId: string;
@Column({type: "text"})
employeeName: string;
@Column({type: "text"})
employeeLastname: string;
@Column({type:"text"})
employeePhonenumber: string;
@Column({type:"text"})
employeeEmail: string;
@Column({
    type :"text",
    nullable: true
})
employeePhoto: string

@ManyToOne(() => Location, (location) => location.employees)
@JoinColumn({
    name: "locationId"
})
location:Location

@OneToOne(() => User )
@JoinColumn({
    name: "userId"
})

user: User
}
