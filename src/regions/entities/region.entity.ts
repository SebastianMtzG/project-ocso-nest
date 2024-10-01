import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class Region {
  @PrimaryGeneratedColumn('increment')
  regionId: number;

  @Column({
    type: 'text',
    unique: true
  })
  regionName: string;

  // Para un array de strings
  @Column('text', { array: true })
  regionStates: string[];

  @OneToMany (() => Location, (location) => location.region)
  location : Location[];

}

