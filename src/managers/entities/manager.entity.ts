import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
        managerId: string;
        @Column('text')
        managerFullNmame:string;
        @Column('float')
        managerSalary: number;
        @Column('text', {
            unique:true,
        })
        managerEmail: string;
        @Column('text')
        managerPhotoNumber: string;


        @OneToOne(() => Location)
        location: Location

        
@OneToOne(() => User )
@JoinColumn({
    name: "userId"
})

user: User
    
}
