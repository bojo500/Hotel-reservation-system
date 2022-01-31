import { Column, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum";
import { UserImagesEntity } from "../user-images.entity";


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

  @Column({ nullable: true })
  image: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => UserImagesEntity, (image: UserImagesEntity) => image.user, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_images',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn:
      { name: 'mediaId', referencedColumnName: 'mediaId' },
  })
  images: UserImagesEntity[];

}
