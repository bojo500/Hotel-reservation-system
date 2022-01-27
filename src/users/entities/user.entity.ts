import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedDate: Date;


  @Column({ unique: true })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  picture: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
