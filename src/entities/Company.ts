import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number

  @Column()
  @Generated('uuid')
  public id: string;

  @Column({ type: "text" })
  public name: string;

  @Column({ type: "text", unique: true })
  public email: string;

  // @Column({ type: "text", select: false })
  @Column({ type: "text" })
  public password: string;

  @Column({ type: "text", unique: true })
  public document: string;

  @Column({ type: "text" })
  public cellphone: string;

  @Column({ type: "text" })
  public description: string;

  // @OneToMany(() => Product, product => product.company,
  //   { cascade: true, eager: true })
  @OneToMany(() => Product, product => product.company)
  products: Product[]

  @Column({ type: 'simple-array' })
  public roles: string[];

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
