import { Products } from "./Products";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  public id: string;

  @Column({ type: "text" })
  public name: string;

  @Column({ type: "text", unique: true })
  public email: string;

  @Column({ type: "text", select: false })
  public password: string;

  @Column({ type: "text", unique: true })
  public document: string;

  @Column({ type: "text" })
  public cellphone: string;

  @Column({ type: "text" })
  public description: string;

  @ManyToOne(() => Products)
  @JoinTable()
  public products: Products[];

  @Column({ type: "text" })
  public roles: string[3];

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
