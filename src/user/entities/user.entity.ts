import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role, Status} from "../../../types";
import {Ad} from "../../ad/entities/ad.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 320,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    length: 60,
    type: 'char',
    nullable: false,
  })
  password: string;

  @Column({
    width: 15,
    type: 'varchar',
    nullable: true,
  })
  tel: string | null;

  @Column({
    width: 100,
    type: 'varchar',
    nullable: true,
  })
  firstName: string | null;

  @Column({
    width: 200,
    type: 'varchar',
    nullable: true,
  })
  lastName: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.INACTIVE,
  })
  status: Status;

  @Column({
    nullable: true,
    default: null,
  })
  activationToken: string | null;

  @OneToMany(() => Ad, ad => ad.user)
  ads: Ad[];
}
