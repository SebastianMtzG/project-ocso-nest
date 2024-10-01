import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
        managerId: string;
        @Column('text')
        managerFullNmame:string;
        @Column('float')
        managerSalary: number;
        @Column('text')
        managerEmail: string;
        @Column('text')
        managerPhotoNumber: string;


        @OneToOne(() => Location)
        location: Location
    
}
