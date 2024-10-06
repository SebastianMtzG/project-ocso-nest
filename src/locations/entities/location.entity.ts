import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany  } from 'typeorm';
import { Manager } from 'src/managers/entities/manager.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { IsObject } from 'class-validator';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  locationId: number;

  @Column('text')
  locationName: string;

  @Column('text')
  locationAddress: string;

  @Column('simple-array')
  locationLatLng: number[];

  @OneToOne(() =>  Manager, {
    eager : true,
  })
  @JoinColumn({
    name: "managerId"
  }
  )
  manager: Manager;
  @ManyToOne(() => Region, (region) => region.location)
  
    @JoinColumn({
      name: "regionId"
    })
  


  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[]

  @IsObject()
  @IsObject()
  region:  Region

}

