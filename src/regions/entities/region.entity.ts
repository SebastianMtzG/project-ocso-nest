import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

