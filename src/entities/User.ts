import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "uuid", nullable: true })
  public user_id: string;

  @Column({ type: "text" })
  public name: string;

  @Column({ type: "text", unique: true })
  public email: string;

  @Column({ type: "text" })
  public password: string;

  @Column({ type: "text", unique: true })
  public document: string;

  @Column({ type: "text" })
  public cellphone: string;

  @Column({ type: "simple-array" })
  public roles: [];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
