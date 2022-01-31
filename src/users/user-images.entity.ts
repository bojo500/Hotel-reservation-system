import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./entities/user.entity";
import { Media } from "../common/media.entity";

@Entity('user_images')
export class UserImagesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @Column()
  userId: string;
  @ManyToOne(() => User, (user: User) => user.images, {
    primary: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  mediaId: string;
  @ManyToOne(() => Media, (media: Media) => media.filename, {
    primary: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'mediaId' })
  media: Media;


}