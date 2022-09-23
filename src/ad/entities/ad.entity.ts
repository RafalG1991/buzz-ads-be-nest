import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    width: 2000,
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  isPublic: boolean;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: true,
  })
  street: string | null;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: false,
  })
  city: string;

  @Column({
    length: 12,
    type: 'varchar',
    nullable: false,
  })
  postalCode: string;

  @Column({
    length: 20,
    type: 'varchar',
    nullable: false,
  })
  apNumber: string;

  @Column({
    length: 50,
    type: 'varchar',
    nullable: false,
  })
  coordinates: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: false,
  })
  price: number;
}
