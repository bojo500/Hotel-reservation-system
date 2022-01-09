import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
 @PrimaryGeneratedColumn()
 id:string;

 @Column()
 roomNub: string;
}
